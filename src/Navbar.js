'use strict';

import React from 'react';
import Classy from 'react-classy';
import { vendorize } from './utils';

@Classy({ hot: true })
export default class Navbar extends React.Component {
  render() {
    return (
      <div className="classy-navbar">
        <ul className="classy-navbar-links">
          <li><a href="#examples">Examples</a></li>
          <li><a href="https://github.com/inturn/classy#api">Documentation</a></li>
          <li><a href="https://github.com/inturn/classy">Github</a></li>
        </ul>
      </div>
    );
  }
  static style=`
   .classy-navbar {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     margin: 0 auto;
     padding: 10px 0;
     width: 100%;
     height: 30px;
     color: #fff;
     text-align: center;
     background-color: #4f4858;
     background-image: linear-gradient(230deg, #a24bcf, #4b79cf, #4bc5cf);
     z-index: 1;
   }
   .classy-navbar-links {
     display: block;
     margin: 0 auto;
     padding: 0;
     width: 720px;
   }
   .classy-navbar-links li {
     list-style-type: none;
     clear: none;
     float: left;
     margin: 0 10px;
   }
   .classy-navbar-links li a {
     ${vendorize('transition: opacity .3s linear;')}
     color: #fff;
     text-transform: lowercase;
     text-decoration: none;
     border-bottom: 1px dotted #fff;
     opacity: .8
   }
   .classy-navbar-links li a:hover {
     opacity: 1;
     border-bottom: 1px solid #fff;
   }
  `
}
