/**
 *
 * Classy - State Helpers
 *
 * @module lib/state
 * @description
 *   Helpers for interfacing with Classy's state object
 */

import * as Utils from './utils';

/**
 *
 * Tracks the states of all Classy components
 *
 */
const STATE = {};

/**
 *
 * Creates a Classy component state object
 *
 * @param  {ReactComponent} Component                          - A ReactComponent
 * @param  {Object}         settings                           - Settings object with the following options:
 * @param  {Boolean}        debug=false                        - Print rendered style to debug console
 * @param  {Boolean}        hot=false                          - Applies two effects:
 *                                                               - Replace Component ref in state object when redecorated
 *                                                               - Always update styles when mounting an instance
 * @param  {String}         styleProp=style                    - Component prop to access for getting styles
 * @param  {String}         themeProp=theme                    - Component prop to access for getting themes
 * @param  {String}         alias=Component.name               - Key under which component state will be cached
 * @param  {String}         elemId=${alias}_${Utils.genHash()} - ID prop for component <style> tag
 * @param  {Object}         elemProps={ type: 'text/css' }     - Other props to apply to component <style> tag
 * @param  {String}         appendTo=head                      - Element to append component <style> tag to
 * @return {Object}                                            - Component state object
 */
export function createComponentState(
  Component,
  {
    debug      = false,
    hot        = false,
    styleProp  = 'style',
    themeProp  = 'theme',
    alias      = Component.name,
    elemId     = `${alias}_${Utils.genHash()}`,
    elemProps  = { type: 'text/css' },
    appendTo   = 'head'
  }={}
) {
  if (!alias) throw new ReferenceError(
    'Classy Error: createComponentState(...)\n' +
    `Component must be named or component's settings must specify an 'alias'.`
  );
  let state = getComponentState(alias);
  // Already has state
  if (state && !hot) {
    console.warn(
      'Classy Warning: createComponentState(...)\n' +
      `State has already been created for component ${alias}.`
    );
  }
  // Construct initial state
  else {
    setComponentState(alias, {
      Component,
      isStyled: false,
      currentTheme: undefined,
      previousTheme: undefined,
      loadingStyles: false,
      cssText: undefined,
      settings: {
        debug,
        hot,
        styleProp,
        themeProp,
        alias,
        elemId,
        elemProps,
        appendTo
      }
    });
    if (debug) console.debug(
      'Classy Debug: createComponentState(...)\n',
      alias+'\n',
      getComponentState(alias)
    );
  }
  return getComponentState(alias);
}

/**
 *
 * Assigns component state to `null`
 *
 * @param {String} alias - Component alias
 */
export function nullifyComponentState(alias) {
  STATE[alias] = null;
}

/**
 *
 * Gets a component's classy state object
 *
 * @param  {String} alias - Component alias
 * @return {Object}       - Copy of state object
 */
export function getComponentState(alias) {
  let state = STATE[alias];
  return state ? { ...state } : undefined;
}

/**
 *
 * Sets a component's classy state object
 *
 * @param {String} alias - Component alias
 * @param {Object} state - State object
 */
export function setComponentState(alias, state) {
  STATE[alias] = state;
}

/**
 *
 * Shallow merges object into component state
 *
 * @param {String} alias  - Component alias
 * @param {Object} state  - Object to be merged into state
 */
export function mergeComponentState(alias, state) {
  STATE[alias] = {
    ...STATE[alias],
    ...state
  };
}

/**
 *
 * Decrements a component state object prop
 *
 * @param {String} alias - Component alias
 * @param {String} key   - Key of prop to be decremented
 * @param {Number} num   - Amount to decrement
 */
export function decrProp(alias, key, num=1) {
  let { [key]: val } = getComponentState(alias);
  val -= num;
  mergeComponentState(alias, { [key]: val });
}

/**
 *
 * Increments a component state object prop
 *
 * @param {String} alias - Component alias
 * @param {String} key   - Key of prop to be incremented
 * @param {Number} num   - Amount to increment
 */
export function incrProp(alias, key, num=1) {
  let { [key]: val } = getComponentState(alias);
  val += num;
  mergeComponentState(alias, { [key]: val });
}

/**
 *
 * Adds component instance to the list of cached instances
 *
 * @param  {String} alias            - Component alias
 * @param  {ReactComponent} instance - Instance of ReactComponent
 * @return {Number}                  - Number of cached instances
 */
export function cacheComponentInstance(alias, instance) {
  let cached = false;
  let instances = getComponentInstances(alias);
  instances.forEach(c => c === instance ? (cached = true) : null);
  if (!cached) {
    instances.push(instance);
    setComponentInstances(alias, instances);
  }
  return getComponentInstances(alias).length;
}

/**
 *
 * Removes component instance from the list of cached instances
 *
 * @param  {String} alias            - Component alias
 * @param  {ReactComponent} instance - Instance of ReactComponent
 * @return {Number}                  - Number of cached instances
 */
export function clearComponentInstance(alias, instance) {
  let index;
  let instances = getComponentInstances(alias);
  instances.forEach((c, i) => c === instance ? (index = i) : null);
  if (index !== undefined) {
    instances.splice(index, 1);
    setComponentInstances(alias, instances);
  }
  return getComponentInstances(alias).length;
}

/**
 *
 * Gets the list of cached component instances
 *
 * @param  {String} alias - Component alias
 * @return {Array}        - Component instances
 */
export function getComponentInstances(alias) {
  let { symbol, Component } = getComponentState(alias);
  return Component[symbol].slice();
}

/**
 *
 * Sets the list of cached component instances
 *
 * @param {String} alias     - Component alias
 * @param {Array}  instances - Component instances
 */
export function setComponentInstances(alias, instances) {
  let { symbol, Component } = getComponentState(alias);
  STATE[alias].Component[symbol] = instances;
}
