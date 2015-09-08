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

### Basic

```js
import React, { Component } from 'react';
// Import Classy
import Classy from 'react-classy';

// Decorate your component
@Classy
export default class Button extends Component {
  // Add your CSS styles
  static style = `
    .button {
      background: blue;
    }
  `
  render() {
    return (
      <button className="button">
        {this.props.children}
      </button>
    );
  }
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
import Classy, { Utils } from 'react-classy';
// CSS pre-processor
import stylus from 'stylus';

@Classy({

  // Makes Classy play nice with react-hot-loader :)
  hot: true,

  // Logs component css to console
  debug: true,

  // Will access specified prop to load component styles
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
```

[Decorator](#decorator) options and [util](#utils) methods are comprehensively documented in the next
section.


API
---

### Decorator

#### @Classy([options])

A class decorator will automatically inject styles into the DOM before your `ReactComponent` instance mounts.

##### options

Type: `Object`

Default: see below

An object that allows you to customize your Classy component settings.
All settings are optional. See defaults below.

##### options.debug

Type: `Boolean`

Default: `false`

Logs rendered cssText to debug console whens component styles are updated

##### options.hot

Type: `Boolean`

Default: `false`

Applies two effects:

* Replaces internal ref to the component if it gets hot-loaded
* Component never uses cached cssText

##### options.styleProp

Type: `String`

Default: `style`

Component prop to access for getting styles

##### options.themeProp

Type: `String`

Default: `themes`

Component prop to access for getting themes

##### options.alias

Type: `String`

Default: `<ReactComponent>.name`

Key under which to identifies your component.
If not specified, your ReactComponent's `constructor.name` will be used.

##### options.elemId

Type: `String`

Default: `alias + '_' + Utils.genHash()`

Example: `MyButton_fxhhf`

ID prop for component `<style>` tag. Uses `options.alias` plus a 5 character hash (separated by an underscore) to prevent unintentional id attribute collisions.

##### options.elemProps

Type: `String`

Default: `{ type: 'text/css' }`

Other props to apply to component `<style>` tag

##### options.appendTo

Type: `String`

Default: `head`

Element to append component `<style>` tag to

<hr />

### Utils

#### Utils.setTheme(alias [, theme, force=false])

Updates component styles with specified theme object

##### alias

Type: `String`

Key under which to identifies your component. (See [decorator options](#optionsalias))

##### theme

Type: `String`

Component theme to use

##### force

Type: `Boolean`

Default: `false`

Re-render theme if already applied

#### Utils.getTheme(alias)

return: `Object`

Gets the current theme applied to a component
(Convenience method for `State.getComponentState(...).currentTheme`).

##### alias

Type: `String`

Key under which to identifies your component. (See [decorator options](#optionsalias))

#### Utils.updateStyle(alias)

Return: `Promise`

Creates a component's `<style>` tag and/or updates its cssText.

##### alias

Type: `String`

Key under which to identifies your component. (See [decorator options](#optionsalias))

#### Utils.removeStyle(alias)

Return: `Promise`

Removes a component's `<style>` tag.

##### alias

Type: `String`

Key under which to identifies your component. (See [decorator options](#optionsalias))

#### Utils.getComponentState(alias)

return: `Object`

Gets a component's Classy state object.

##### alias

Type: `String`

Key under which to identifies your component. (See [decorator options](#optionsalias))
