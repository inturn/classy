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
