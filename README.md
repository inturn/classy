![Classy logo](https://inturn.github.io/classy/dist/classy-logo-color.svg)

### Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [API](#api)

Installation
------------

`npm install react-classy`

Getting Started
---------------

Classy makes styling React components *familiar*, *extensible*, and *simple*.
By simple, I mean 3 steps:

0. Import the `react-classy` into your React component module
0. Decorate your React component class with `@Classy`.
0. Assign a CSS string to a static `style` prop on your React component class.

The styles defined on your React component will get automatically injected into
the DOM right before your component mounts. Check out some examples of basic
and advanced usage in the next section.

Examples
--------

### Basic Usage

Tightly coupling a component with its styles is easily achieved:

```js
import React from 'react';
import Classy from 'react-classy';

@Classy
export default class MyButton extends React.Component {
  render() {
    return (
      <button className="my-button">Push Me!</button>;
    );
  }
  static style = `
    .my-button {
      color: white;
      background: blue;
      border-radius: 0;
    }
  `
}
```

### Advanced Usage

If you'd like to use custom settings, theme your styles, or use custom
css-rendering middleware, we've also got your back:

```js
import React from 'react';
import { default as Classy, Utils } from './react-classy';
// TJ's Stylus CSS pre-processor (it's my favs)
import stylus from 'stylus';

// Classy's decorator accepts an optional options object.
const CLASSY_SETTINGS = {
  // Logs rendered css and operation duration
  debug: true,
  // Will render CSS from `stylus` prop instead of `style`
  styleProp: 'stylus'
};

// Pass the options to the decorator
@Classy(CLASSY_SETTINGS)
export default class Button extends React.Component {

  // We'll render a button that switches themes
  // when it is pressed.
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
  // This makes is easy for others to extend your component
  // and modify theme properties
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
  // you can assign a method that returns a CSS string.
  // Using this approach, you can easily transform your styles.
  // We are also options the default theme via rest param
  static stylus(theme=this.constructor.themes.light) {
    let cssText;
    let style = `
      .my-button
        color: $theme.textColor
        background: $theme.background
    `;
    stylus(style)
      .set('imports', [])
      .define('$theme', theme, true)
      .render((err, output) => {
        if (err) throw err;
        cssText = output;
      });
    return cssText;
  }

  // Method that switches the component's theme.
  // Will toggle from 'light' to 'dark' and vice versa
  switchTheme(e) {
    let { name } = this.constructor;
    let theme = Utils.getTheme(name);
    theme = 'light' === theme ? 'dark' : 'light';
    Utils.setTheme(name, theme);
  }

}
```

[Decorator](#decorator-api) options and [util](#utils-api) methods are comprehensively documented in the next
section.


API
---

### Decorator API

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

...description...

##### options.styleProp

Type: `String`

Default: `style`

...description...

##### options.themeProp

Type: `String`

Default: `themes`

...description...

##### options.alias

Type: `String`

Default: `<ReactComponent>.name`

...description...

##### options.styleId

Type: `String`

Default: `alias`

...description...

##### options.appendTo

Type: `String`

Default: `head`

...description...

##### options.mediaType

Type: `String`

Default: `text/css`

...description...

### Utils API

#### Utils.setTheme.(name [, theme])

##### name

Type: `String`

...description...

##### theme

Type: `String`

...description...

#### Utils.getComponentState.(name)

##### name

Type: `String`

...description...

#### Utils.appendStyle.(name)

##### name

Type: `String`

...description...

#### Utils.removeStyle.(name)

##### name

Type: `String`

...description...
