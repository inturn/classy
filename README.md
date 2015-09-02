<p align="center">
  <a href="http://inturn.github.io/classy/">
    <img alt="Classy logo" src="https://inturn.github.io/classy/dist/classy-logo-color.svg" height="150" />
  </a>
</p>
<p align="center">
  <a href="http://badge.fury.io/js/react-classy">
    <img alt="npm version" src="https://badge.fury.io/js/react-classy.svg" />
  </a>
  <a>
    <img alt="npm downloads" src="http://img.shields.io/npm/dm/react-classy.svg" />
  </a>
  <a href="https://travis-ci.org/inturn/classy">
    <img alt="build status" src="https://travis-ci.org/inturn/classy.svg" />
  </a>
  <a href="https://david-dm.org/inturn/classy">
    <img alt="dependency status" src="https://david-dm.org/inturn/classy.svg" />
  </a>
  <a href="https://david-dm.org/inturn/classy#info=devDependencies">
    <img alt="devdependency status" src="https://david-dm.org/inturn/classy/dev-status.svg" />
  </a>
</p>
<br />
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
import React, { Component } from 'react';
// Import Classy
import Classy from 'react-classy';

// Decorate your component
@Classy
export default class MyButton extends Component {

  render() {
    return <button {...this.props} />;
  }

  static defaultProps = {
    className: 'my-button my-button--default',
    children: 'Push Me'
  }

  // Assign some stringified CSS to a static `style` prop
  static style = `
    .my-button--default {
      color: white;
      background: #4b79cf;
      border-radius: 4px;
      border: 0;
      outline: none;
      padding: 20px;
      font-size: 18px;
      font-family: 'Helvetica Neue', helvetica, sans-serif;
      transition: transform .3s ease;
    }
    .my-button--default:hover {
      cursor: pointer;
    }
    .my-button--default:focus {
      transform: translateY(4px);
    }
  `

}

```

### Advanced

Classy is also highly customizable and supports asynchronous style
rendering, custom middleware, and theming! In the next example, we'll
demonstrate all of the aforementioned while creating a button that
switches themes when clicked.

```js
import React, { Component } from 'react';
// Import the decorator and utils modules
import { Classy, Utils } from 'react-classy';
// CSS pre-processor
import stylus from 'stylus';

// We can pass an optional settings object
@Classy({
  // Logs component css to console
  debug: true,
  // Will get style value from specified prop
  // instead of default `style` prop
  styleProp: 'stylus'
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
    .toggle-button--default
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
