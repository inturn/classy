'use strict';

import React from 'react';
import Classy from 'react-classy';

@Classy({ dev: true })
export default class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
  static style=`
   * box-sizing {
     border-box
   }
   body, html {
     margin: 0;
     font-family: 'Fira Sans', 'Helvetica Neue', helvetica, sans-serif;
     color: #6d707c;
   }
   a {
     color: #ed6748;
     border-bottom: 1px dotted #ed6748;
     text-decoration: none;
   }
   a:hover {
     border-bottom: 1px solid #ed6748;
   }
   code {
     background-color: cornsilk;
     padding: 0 4px;
     font-size: 14px;
   }
  `
}

//
// let codeStyles = ['es5', 'es6', 'es7'];
// let navbar = document.querySelector('.cl-nav');
// let hero = document.querySelector('.cl-hero');
// let heroHeight = hero.offsetHeight;
//
// window.onscroll = stickyNav;
//
// window.onload = function() {
//   let codeSwitchButtons = document.querySelectorAll('.cl-code-block-button');
//   for (let i = 0, len = codeSwitchButtons.length; i < len; i++) {
//     codeSwitchButtons[i].addEventListener('click', switchCodeStyle);
//   }
// };
//
// function switchCodeStyle(e) {
//   let style = e.target.dataset.codeStyle;
//   codeStyles.forEach(function(codeStyle) {
//     let blockSelector = '.cl-code-block-' + codeStyle;
//     let buttonSelector = '.cl-code-block-button-' + codeStyle;
//     if (style === codeStyle) {
//       let codeBlocks = document.querySelectorAll(blockSelector);
//       let codeButtons = document.querySelectorAll(buttonSelector);
//       safeAddActive(codeBlocks);
//       safeAddActive(codeButtons);
//     } else {
//       let codeBlocks = document.querySelectorAll(blockSelector);
//       let codeButtons = document.querySelectorAll(buttonSelector);
//       safeRemoveActive(codeBlocks);
//       safeRemoveActive(codeButtons);
//     }
//   });
// };
//
// function safeAddActive(collection) {
//   for (let i = 0, len = collection.length; i < len; i++) {
//     collection[i].classList.add('active');
//   }
// }
//
// function safeRemoveActive(collection) {
//   for (let i = 0, len = collection.length; i < len; i++) {
//     collection[i].classList.remove('active');
//   }
// }
//
// function stickyNav() {
//   if (window.scrollY > heroHeight) {
//     navbar.classList.add('sticky');
//   } else {
//     navbar.classList.remove('sticky');
//   }
// }
