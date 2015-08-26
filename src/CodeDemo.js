'use strict';

import React from 'react';
import Classy from 'react-classy';

@Classy({ dev: true })
export default class CodeDemo extends React.Component {
  render() {
    let { height } = this.props;
    return (
      <div className="classy-code-demo" style={{ height }}>
        {this.props.children}
      </div>
    );
  }
  static style = `
    .classy-code-demo {
      border: 2px dashed #ccc;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
  static defaultProps = {
    height: 'auto'
  }
}
