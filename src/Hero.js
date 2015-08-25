'use strict';

import React from 'react';
import Classy from 'react-classy';

@Classy({ dev: true })
export default class Hero extends React.Component {
  render() {
    return (
      <div className="classy-hero">
        <a href="https://github.com/inturn/classy">
          <img style={{
              position: 'absolute',
              top: 0,
              left: 0,
              border: 0
            }}
            src="https://camo.githubusercontent.com/c6286ade715e9bea433b4705870de482a654f78a/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f77686974655f6666666666662e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png"
          />
        </a>
        <ul className="classy-hero-links">
          <li><a href="#examples">Examples</a></li>
          <li><a href="https://github.com/inturn/classy#api">Documentation</a></li>
          <li><a href="https://github.com/inturn/classy">Github</a></li>
        </ul>
        <img
          className="classy-hero-logo"
          src="dist/classy-logo.svg"
          alt="Classy"
        />
        <div className="classy-github">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=inturn&repo=classy&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="115px"
            height="30px">
          </iframe>
        </div>
      </div>
    );
  }
  static style=`
   .classy-hero {
     animation: background 12s ease infinite;
     position: relative;
     text-align: center;
     padding-top: 60px;
     padding-bottom: 48px;
     box-sizing: border-box;
     background-size: 300% 300%;
     background-color: #4f4858;
     background-image: linear-gradient(230deg,#a24bcf,#4b79cf,#4bc5cf);
     z-index: 100;
   }
   .classy-hero-links {
     position: absolute;
     top: 10px;
     right: 10px;
   }
   .classy-hero-links li {
     list-style-type: none;
     clear: none;
     float: left;
     margin: 0 10px;
   }
   .classy-hero-links li a {
     ${['-webkit-', '-moz-', ''].map(v => v+'transition: * .3s linear;').join('\n')}
     color: #fff;
     text-transform: lowercase;
     text-decoration: none;
     border-bottom: 1px dotted #fff;
     opacity: .8
   }
   .classy-hero-links li a:hover {
     opacity: 1;
     border-bottom: 1px solid #fff;
   }
   .classy-hero-logo {
     color: white;
     width: 50%;
     max-width: 420px;
     margin: 70px;
     display: inline-block;
     opacity: 0;
     ${['-webkit-', '-moz-', ''].map(v => v+'transform: translateY(100px);').join('\n')}
     ${['-webkit-', '-moz-', ''].map(v => v+'animation: fade-in .5s cubic-bezier(.3,.2,.4,1.2) .3s forwards;').join('\n')}
   }
   ${
['-webkit-', '-moz-', ''].map((v) => (
`@${v}keyframes fade-in {
  50% {
    opacity: .2
  }
  100% {
    opacity: 1;
    ${['-webkit-', '-moz-', ''].map(v => v+'transform: translateY(0);').join('\n')}
  }
}`
)).join('\n')
   }

   ${
['-webkit-', '-moz-', ''].map((v) => (
`@${v}keyframes background {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}`
)).join('\n')
   }
  `
}
