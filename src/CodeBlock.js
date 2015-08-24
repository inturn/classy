'use strict';

import React from 'react';
import Classy from 'react-classy';

@Classy({ dev: true })
export default class CodeBlock extends React.Component {
  render() {
    return (
      <pre {...this.preProps}></pre>
    );
  }
  set preProps(x) {}
  get preProps() {
    return {
      className: 'cl-code-block-es7'
    };
  }
  static style = `
    .cl-code-block-es7 {
      padding: 20px;
      background: #4f4858;
      color: #fff;
    }
  `
}
