var codeStyles = ['es5', 'es6', 'es7'];
var navbar = document.querySelector('.cl-nav');
var hero = document.querySelector('.cl-hero');
var heroHeight = hero.offsetHeight;

function switchCodeStyle(e) {
  var style = e.target.dataset.codeStyle;
  codeStyles.forEach(function(codeStyle) {
    var blockSelector = '.cl-code-block-' + codeStyle;
    var buttonSelector = '.cl-code-block-button-' + codeStyle;
    if (style === codeStyle) {
      var codeBlocks = document.querySelectorAll(blockSelector);
      var codeButtons = document.querySelectorAll(buttonSelector);
      safeAddActive(codeBlocks);
      safeAddActive(codeButtons);
    } else {
      var codeBlocks = document.querySelectorAll(blockSelector);
      var codeButtons = document.querySelectorAll(buttonSelector);
      safeRemoveActive(codeBlocks);
      safeRemoveActive(codeButtons);
    }
  });
};

function safeAddActive(collection) {
  for (var i = 0, len = collection.length; i < len; i++) {
    collection[i].classList.add('active');
  }
}

function safeRemoveActive(collection) {
  for (var i = 0, len = collection.length; i < len; i++) {
    collection[i].classList.remove('active');
  }
}

function stickyNav() {
  if (window.scrollY > heroHeight) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}

window.onscroll = stickyNav;

window.onload = function() {
  var codeSwitchButtons = document.querySelectorAll('.cl-code-block-button');
  for (var i = 0, len = codeSwitchButtons.length; i < len; i++) {
    codeSwitchButtons[i].addEventListener('click', switchCodeStyle);
  }
};


