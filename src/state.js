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
  let name = alias;
  if (!name) throw new ReferenceError(
    'Classy Error: createComponentState(...)\n' +
    `Component must have a 'name' or component's settings must have an 'alias'.`
  );
  let state = getComponentState(name);
  // Already has state
  if (state && !hot) {
    console.warn(
      'Classy Warning: createComponentState(...)\n' +
      `State has already been created for component ${name}.`
    );
  }
  // Construct initial state
  else {
    setComponentState(name, {
      Component,
      numMounted: 0,
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
      name+'\n',
      getComponentState(name)
    );
  }
  return getComponentState(name);
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
 * @return {Object}       - State object
 */
export function getComponentState(alias) {
  return STATE[alias];
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
export function decrProp(name, key, num=1) {
  let { [key]: val } = getComponentState(name);
  val -= num;
  mergeComponentState(name, { [key]: val });
}

/**
 *
 * Increments a component state object prop
 *
 * @param {String} alias - Component alias
 * @param {String} key   - Key of prop to be incremented
 * @param {Number} num   - Amount to increment
 */
export function incrProp(name, key, num=1) {
  let { [key]: val } = getComponentState(name);
  val += num;
  mergeComponentState(name, { [key]: val });
}
