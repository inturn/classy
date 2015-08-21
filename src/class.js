/**
 *
 * Classy - Class Helpers
 *
 * @module lib/Class
 * @description
 *   Helpers for modifying and getting values from Classy ReactComponents
 */

import * as State from './state';
import * as DOM from './dom';

/**
 *
 * [reassignLifecycleMethods description]
 *
 * @param  {[type]} ...args [description]
 * @return {[type]}         [description]
 */
export function reassignLifecycleMethods(...args) {
  [
    reassignComponentWillMount,
    reassignComponentWillUnmount
  ].forEach(fn => fn(...args));
}

/**
 *
 * [reassignComponentWillMount description]
 *
 * @param  {[type]} Component [description]
 * @param  {[type]} instance  [description]
 * @return {[type]}           [description]
 */
export function reassignComponentWillMount(Component, instance) {
  let { componentWillMount: fn } = Component.prototype;
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: reassignComponentWillMount(...)\n' +
    `Expected componentWillMount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  let { name } = Component.constructor;
  Object.defineProperty(Component.prototype, 'componentWillMount', {
    get: function componentWillMount(...args) {
      let state = State.getComponentState(name);
      let { isStyled, debug } = state;
      State.incrProp(name, 'numMounted');
      if (!isStyled) {
        DOM.updateStyle(name)
          .then(cssText => debug && console.debug(
            // Log style was removed
            cssText
          ))
          .catch(console.error.bind(console));
      }
      if (fn) fn.call(instance, ...args);
    }
  });
}

/**
 *
 * [reassignComponentWillUnmount description]
 *
 * @param  {[type]} Component [description]
 * @param  {[type]} instance  [description]
 * @return {[type]}           [description]
 */
export function reassignComponentWillUnmount(Component, instance) {
  let { componentWillUnmount: fn } = Component.prototype;
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: reassignComponentWillUnmount(...)\n' +
    `Expected componentWillUnmount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  let { name } = Component.constructor;
  Object.defineProperty(Component.prototype, 'componentWillUnmount', {
    get: function componentWillUnmount(...args) {
      let state = State.getComponentState(name);
      let { isStyled, debug } = state;
      State.decrProp(name, 'numMounted');
      if (isStyled) {
        DOM.removeStyle(name)
          .then(() => debug && console.debug(
            // Log style was removed
            // ...
          ))
          .catch(console.error.bind(console));
      }
      if (fn) fn.call(instance, ...args);
    }
  });
}

/**
 *
 * [getComponentCSS description]
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 * @return {Promise}
 */
export async function getComponentCSS(name) {
  let state = State.getComponentState(name);
  let { Component, currentTheme, settings } = state;
  let { styleProp, themeProp, debug } = settings;
  let style = Component[styleProp];
  let themes = Component[themeProp];
  let theme = themes ? themes[currentTheme] : undefined;
  let returnValue;
  // Style is a string
  if (typeof style === 'string') {
    returnValue = style;
  }
  // Style is a Promise
  else if (style instanceof Promise) {
    returnValue = await style(theme);
  }
  // Style is...something else
  else throw new TypeError(
    'Classy Error: getComponentCSS(...)\n' +
    `Expected component ${name}'s styleProp to be a string or Promise ` +
    'that fulfills with a string.\n' +
    `-> Got type '${typeof style}'.`
  );
  return returnValue;
}
