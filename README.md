<p align="center">
  <img src="https://inturn.github.io/classy/dist/classy-logo-color.svg" alt="Classy lolo" height="150" />
</p>

[![npm version](https://badge.fury.io/js/react-classy.svg)](http://badge.fury.io/js/react-classy)
[![Build Status](https://travis-ci.org/inturn/classy.svg)](https://travis-ci.org/inturn/classy)
[![Dependency Status](https://david-dm.org/inturn/classy.svg)](https://david-dm.org/inturn/classy)
[![devDependency Status](https://david-dm.org/inturn/classy/dev-status.svg)](https://david-dm.org/inturn/classy#info=devDependencies)

##

### Table of Contents

- [Install](#install)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API](#api)

Install
-------

##### `npm install react-classy`

Getting Started
---------------

Classy makes styling React components *composable*, *extensible*, and *simple*.
Implementation requires only 3 steps:

0. Import `react-classy` into your React component module
0. Decorate your React component class with `@Classy`.
0. Assign a CSS string to a static `style` prop on your React component class.

The styles defined on your React component will get automatically injected into
the DOM right before your component mounts. Check out some examples of basic
and advanced usage in the next section.

Usage
-----

Let's say have a file called `MyButton.js` in which we plan to create a button
React component. The following examples illustrate how you might use Classy to
encapsulate your component's styles as part of an ES7 class definition.

### Basic

```js
import React from 'react';
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
```

### Advanced

Classy is also highly customizable and supports asynchronous style
rendering, custom middleware, and theming! In the next example, we'll
demonstrate all of the aforementioned while creating a button that
switches themes when clicked.

```js
import React from 'react';
// Import the decorator and utils modules
import { Classy, Utils } from './react-classy';
// CSS pre-processor
import stylus from 'stylus';

// We can pass an optional settings object
@Classy({
  // Logs component css
  debug: true,
  // Will render CSS from \`stylus\` prop instead of \`style\`
  styleProp: 'stylus'
})
export default class MyButton extends React.Component {

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
  static stylus(theme=MyButton.themes.light) {
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
    let { name } = MyButton;
    let theme = Utils.getTheme(name);
    theme = 'light' === theme ? 'dark' : 'light';
    Utils.setTheme(name, theme);
  }

}
```

[Decorator](#decorator) options and [util](#utils) methods are comprehensively documented in the next
section.


API
---

### Decorator

#### @Classy([options])

A class decorator will automatically inject styles into the DOM when your `ReactComponent` instance mounts.

##### options

Type: `Object`

Default: see below

An object that allows you to customize your Classy component settings.
All settings are optional. See defaults below.

##### options.debug

Type: `Boolean`

Default: `false`

[description]

##### options.styleProp

Type: `String`

Default: `style`

[description]

##### options.themeProp

Type: `String`

Default: `themes`

[description]

##### options.alias

Type: `String`

Default: `<ReactComponent>.name_<hash>`

Example: `MyButton_fxhhf`

[description]

##### options.elemId

Type: `String`

Default: `alias`

[description]

##### options.elemProps

Type: `String`

Default: `text/css`

[description]

##### options.appendTo

Type: `String`

Default: `head`

[description]

### Utils

#### Utils.setTheme(name [, theme])

##### name

Type: `String`

[description]

##### theme

Type: `String`

[description]

#### Utils.updateStyle(name)

##### name

Type: `String`

[description]

#### Utils.removeStyle(name)

##### name

Type: `String`

[description]

#### Utils.getComponentState(name)

##### name

Type: `String`

[description]

#### Utils.createComponentState(Component [, options])

##### Component

Type: `ReactComponent`

[description]

##### options

Type: `Object`

Same options as the [@Classy decorator options](#options)
