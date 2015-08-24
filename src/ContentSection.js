'use strict';

import React from 'react';
import Classy from 'react-classy';

@Classy({ dev: true })
export default class ContentSection extends React.Component {
  render() {
    return (
      <div className="classy-content-section">{this.props.children}</div>
    );
  }
  static style=`
   .classy-content-section {
     padding: 20px;
     max-width: 720px;
     margin: 0 auto;
     border-bottom: 1px solid #eee;
   }
   h1, h2, h3, h4, h5, h6 {
     margin: 0;
     padding-bottom: 20px;
     text-align: center;
     color: #4f4858;
     font-family: 'Fira Sans', sans-serif;
   }
   h2 {
     font-size: 30px
   }
   p {
     margin: 0;
     padding-bottom: 20px;
     font-size: 18px;
     line-height: 1.5;
     font-family: 'Fira Sans', sans-serif;
     font-weight: 300 !important;
   }
   ul {
     margin: 0;
     padding-bottom: 20px
   }
  `
}
