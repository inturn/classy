import React, { Component } from 'react';
// Import the decorator and utils modules
import Classy, { Utils } from 'react-classy';
// CSS pre-processor
import stylus from 'stylus';

// Custom settings:
@Classy({

  // Makes Classy play nice with react-hot-loader :)
  hot: true

  // Logs component css to console
  debug: true,

  // Will access specified prop to load component styles
  // instead of default `style` prop
  styleProp: 'stylus',

})
export default class ToggleButton extends Component {

  render() {
    return <button {...this.props} />;
  }

  static defaultProps = {
    className: 'toggle-button toggle-button--default',
    children: 'Touch Me!',

    // Method that switches the component's theme.
    // Will toggle from 'light' to 'dark' and vice versa.
    onClick: function switchTheme(e) {
      let { name } = ToggleButton;
      let theme = Utils.getTheme(name);
      theme = 'dark' === theme ? 'light' : 'dark';
      Utils.setTheme(name, theme);
    }

  }

  // Let's define our themes as a static.
  // This makes it easy for others to modify a component's theme(s)
  // via class extension.
  static theme = {
    light: {
      textColor: '#a24bcf',
      background: 'transparent',
      borderRadius: '30px'
    },
    dark: {
      textColor: '#fff',
      background: '#4b79cf',
      borderRadius: '4px'
    }
  }

  // Instead of a hard-coding your CSS,
  // you can assign a method that returns Promise that fulfills a CSS string.
  // Our default theme is set via rest param.
  static stylus(theme=ToggleButton.theme.light) {
    let styl = `

    .toggle-button

      &--default
        color: convert($theme.textColor)
        background: convert($theme.background)
        border: 1px solid convert($theme.textColor)
        border-radius: convert($theme.borderRadius)
        outline: none
        padding: 20px
        font-size: 18px
        font-family: 'Helvetica Neue', helvetica, sans-serif
        transition: transform .3s ease

        &:hover
          cursor: pointer

        &:focus
          transform: translateY(4px)

    `;
    // Finally, let's use our Stylus middleware to render actual CSS
    // and return it with a Promise
    return new Promise((yep, nope) => stylus(styl.trim())
      .define('$theme', theme, true)
      .render((err, css) => err ? nope(err) : yep(css))
    );
  }

}
