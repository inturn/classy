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
 * Updates component styles with specified theme object
 *
 * @param  {String}  name        - Classy component name
 * @param  {String}  theme       - Classy component theme name
 * @param  {Boolean} force=false - Re-render theme if already applied
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
 * @return {String} - Name of the currently applied theme
 */
function getTheme(...args) {
  return State.getComponentState(...args).currentTheme;
}

/**
 *
 * Curries async updateStyle(...)
 *
 */
async function updateStyle(...args) {
  return await DOM.updateStyle(...args);
}

/**
 *
 * Curries async removeStyle(...)
 *
 */
async function removeStyle(...args) {
  return await DOM.removeStyle(...args);
}

/**
 *
 * Curries State.getComponentState(...)
 *
 */
function getComponentState(...args) {
  return State.getComponentState(...args);
}

/**
 *
 * Manually initalize your component with Classy
 *
 */
function initClassy(...args) {
  return State.createComponentState(...args);
}

/**
 *
 * Generates a simple hash with low prob of collision
 *
 * @param  {Number} len=5 - Length of hash to be generated
 * @return {String}       - A five char hash
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
