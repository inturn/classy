'use strict';

import React from 'react';
import Classy from 'react-classy';
import cx from 'classnames';

@Classy({ dev: true })
export default class CodeBlock extends React.Component {
  render() {
    return (
      <pre {...this.preProps}>
      {this.props.code}
      </pre>
    );
  }
  set preProps(x) {}
  get preProps() {
    let { props } = this;
    if (!props) return {};
    return {
      className: cx({
        'classy-code-block': true,
        'classy-code-block--center': props.center,
        'classy-code-block--large': props.large
      }),
      style: {
        width: props.width,
        ...props.style
      }
    };
  }
  static style = `
    .classy-code-block {
      box-sizing: border-box;
      display: block;
      margin: 0;
      padding: 20px;
      background: #4f4858;
      color: #fff;
      font-size: 13px
    }
    .classy-code-block--large {
      font-size: 18px;
    }
    .classy-code-block--center {
      margin: 0 auto;
    }
  `
  static defaultProps = {
    width: '100%'
  }
}
