/**
 *
 * Classy - Utils
 *
 * @module utils
 * @description
 *   Public and private utility methods
 */

import * as State from './state';
import * as DOM from './dom';

/**
 *
 * Classy public utility methods
 *
 * @type {Object}
 */
export default {
  setTheme,
  getTheme,
  updateStyle,
  removeStyle,
  getComponentState,
  createComponentState,
  resetAllInternalStates,
  // private methods
  // @todo: remove from default exports
  genHash,
  subscribe,
  unsubscribe,
  publish,
};

/**
 *
 * Updates component styles with specified theme object
 *
 * @param  {String}  alias       - Classy component alias
 * @param  {String}  theme       - Classy component theme name
 * @param  {Boolean} force=false - Re-render theme if already applied
 * @return {Promise}
 */
async function setTheme(alias, theme, force=false) {
  let state = State.getComponentState(alias);
  let { isStyled, currentTheme, cssText } = state;
  // Component is already styled with specified theme
  if (!force && isStyled && theme === currentTheme) {
    return cssText;
  }
  State.mergeComponentState(alias, { currentTheme: theme });
  return await DOM.updateStyle(alias);
}

/**
 *
 * Convenience method for State.getComponentState(...).currentTheme
 *
 * @return {String} - Name of the currently applied theme
 */
function getTheme(...args) {
  return State.getComponentState(...args).currentTheme;
}

/**
 *
 * Curries async DOM.updateStyle(...)
 *
 */
async function updateStyle(...args) {
  return await DOM.updateStyle(...args);
}

/**
 *
 * Curries async DOM.removeStyle(...)
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
function createComponentState(...args) {
  return State.createComponentState(...args);
}

/**
 *
 * Resets the internal state props for a component
 * Curries State.resetInternalState(...)
 *
 */
function resetInternalState(...args) {
  return State.resetInternalState(...args);
}

/**
 *
 * Basically, resets Classy
 * Curries State.resetAllInternalStates(...)
 *
 */
function resetAllInternalStates(...args) {
  return State.resetAllInternalStates(...args);
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

// @todo: move functions below into an 'events' module

/**
 *
 * Calls handler attached to an event
 *
 * @param  {String} alias - Classy component alias
 * @param  {String} event - The event handler to call
 * @param  {Object} more  - Any number of additional args to pass to handler
 */
function publish(alias, event, ...more) {
  let state = State.getComponentState(alias);
  let { subscriptions } = state;
  if (subscriptions[event]) subscriptions[event](state, ...more);
}

/**
 *
 * Attaches a handler to an event
 *
 * @param  {String}   alias   - Classy component alias
 * @param  {String}   event   - The event to assign handler to
 * @param  {Function} handler - The event handler
 */
function subscribe(alias, event, handler) {
  State.mergeComponentState(alias, {
    subscriptions: { [event]: handler }
  });
}

/**
 *
 * Detaches a handler from an event
 *
 * @param  {String} alias - Classy component alias
 * @param  {String} event - The event to unassign handler from
 */
function unsubscribe(alias, event) {
  State.mergeComponentState(alias, {
    subscriptions: { [event]: null }
  });
}
