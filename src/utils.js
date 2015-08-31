/**
 *
 * Classy - Utils
 *
 * @module utils
 * @description
 *   Public utility methods
 */

import * as State from './state';
import * as DOM from './dom';

/**
 *
 * Classy Public Utils
 *
 * @type {Object}
 */
export default {
  setTheme,
  getTheme,
  updateStyle,
  removeStyle,
  getComponentState,
  initClassy,
  genHash
};

/**
 *
 * [setTheme description]
 *
 * @param  {[type]} name         [description]
 * @param  {[type]} currentTheme [description]
 * @param  {[type]} force        [description]
 * @return {Promise}
 */
async function setTheme(name, theme, force=false) {
  let state = State.getComponentState(name);
  let { isStyled, currentTheme, cssText } = state;
  // Component is already styled with specified theme
  if (!force && isStyled && theme === currentTheme) {
    return cssText;
  }
  State.mergeComponentState(name, { currentTheme: theme });
  return await DOM.updateStyle(name);
}

/**
 *
 * Convenience method for getComponentState(...).currentTheme
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getTheme(name) {
  return State.getComponentState(name).currentTheme;
}

/**
 *
 * Curries async updateStyle(...)
 *
 * @param  {[type]} ...args [description]
 * @return {[type]}         [description]
 * @return {Promise}
 */
async function updateStyle(...args) {
  return await DOM.updateStyle(...args);
}

/**
 *
 * Curries async removeStyle(...)
 *
 * @param  {[type]} ...args [description]
 * @return {[type]}         [description]
 * @return {Promise}
 */
async function removeStyle(...args) {
  return await DOM.removeStyle(...args);
}

/**
 *
 * Curries getComponentState(...)
 *
 * @desc   Curries State.getComponentState(...)
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getComponentState(name) {
  return State.getComponentState(name);
}

/**
 *
 * Manually initalize your component with Classy
 *
 * @param  {[type]} ...args [description]
 * @return {[type]}         [description]
 */
function initClassy(...args) {
  return State.createComponentState(...args);
}

/**
 *
 * [genHash description]
 *
 * @param  {[type]} len=5 [description]
 * @return {String}       A five char hash
 */
function genHash(len=5) {
  let hash = (+new Date * Math.random())
    .toString(36)
    .substring(0, len)
    .replace('.', '');
  while (hash.length !== len) {
    if (hash.length > len) hash = hash.substr(0, len);
    if (hash.length < len) hash += genHash(len - hash.length);
  }
  return hash;
}
