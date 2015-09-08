'use strict';

import React, { Component } from 'react';
import Classy from '../src';
import cx from 'classnames';

/**
 * @class Button
 * @extends ReactComponent
 * @description
 *   A basic button
 */
@Classy
export class Button extends Component {
  static style = `
    .button {
      background: blue;
    }
  `
  render() {
    return (
      <button
        ref="button"
        className="button">
        {this.props.children}
      </button>
    );
  }
}

/**
 * @class ToggleButton
 * @extends ReactComponent
 * @description
 *   A button which can be turned on/off
 */
@Classy
export class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  static style = `
    .toggle-button {
      background: red;
    }
    .toggle-button.toggle-button--active {
      background: green;
    }
  `
  static defaultProps = {}
  on() {
    this.setState({ active: true });
  }
  off() {
    this.setState({ active: false });
  }
  toggle() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <button
        ref="button"
        className={cx({
          'toggle-button': true,
          'toggle-button--active': this.state.active
        })}
        onClick={::this.toggle}>
        {
          this.props.children
          ? this.props.children
          : this.state.active
            ? 'On'
            : 'Off'
        }
      </button>
    );
  }
}

/**
 * @class App
 * @extends ReactComponent
 * @description
 *   A basic React "app"
 */
@Classy
export class App extends Component {
  static style = `
    .app {
      background: white;
    }
  `
  render() {
    return (
      <div
        ref="container"
        className="app">
        <Button
          ref="button">
          Touch me!
        </Button>
        <ToggleButton
          ref="toggle"
        />
      </div>
    );
  }
}
