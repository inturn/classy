const INSTALL = 'npm install react-classy';
const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const BASIC_EXAMPLE =
`import React from 'react';
// Import Classy
import Classy from 'react-classy';

// Decorate your component
@Classy
export default class MyButton extends React.Component {
  render() {
    return (
      <button className="my-button">Push Me!</button>;
    );
  }
  // Assign some stringified CSS to a static \`style\` prop
  static style = \`
    .my-button {
      color: white;
      background: blue;
      border-radius: 0;
    }
  \`
}
`
const ADVANCED_EXAMPLE =
`import React from 'react';
// Import Classy decorator and utils modules
import { Classy, Utils } from './react-classy';
// Stylus CSS pre-processor
import stylus from 'stylus';

// Classy's decorator accepts an options object, so let's construct one.
const CLASSY_SETTINGS = {
  // Logs rendered css and operation duration
  debug: true,
  // Will render CSS from \`stylus\` prop instead of \`style\`
  styleProp: 'stylus'
};

// Pass the options to the decorator
@Classy(CLASSY_SETTINGS)
export default class Button extends React.Component {

  // We'll render a button that switches themes when it's clicked.
  render() {
    return (
      <button
        className="my-button"
        onClick={e => this.switchTheme(e)}>
        Touch Me!
      </button>
    );
  }

  // So let's define our themes as a static prop.
  // This makes is easy for others to modify a component's theme(s)
  // via class extension.
  static themes = {
    light: {
      textColor: 'blue',
      background: 'white'
    },
    dark: {
      textColor: 'white',
      background: 'blue'
    }
  }

  // Instead of a hard-coding your CSS,
  // you can assign a method that returns Promise that fulfills a CSS string.
  // Using this approach, you can easily transform/preprocess your styles.
  // We can also set the default theme via rest param.
  static stylus(theme=this.constructor.themes.light) {
    return new Promise((fulfill, reject) =>
      stylus(\`
        .my-button
          color: convert($theme.textColor)
          background: convert($theme.background)
      \`)
        .set('imports', [])
        .define('$theme', theme, true)
        .render((err, css) => {
          if (err) return reject(err);
          fulfill(css);
        })
    );
  }

  // Method that switches the component's theme.
  // Will toggle from 'light' to 'dark' and vice versa.
  switchTheme(e) {
    let { name } = this.constructor;
    let theme = Utils.getTheme(name);
    theme = 'light' === theme ? 'dark' : 'light';
    Utils.setTheme(name, theme);
  }

}
`
export {
  INSTALL,
  LIPSUM,
  BASIC_EXAMPLE,
  ADVANCED_EXAMPLE
}
