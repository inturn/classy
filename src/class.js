/**
 *
 * Classy - Class Helpers
 *
 * @module lib/class
 * @description
 *   Helpers for modifying and getting values from Classy ReactComponents
 */

import * as State from './state';
import * as DOM from './dom';

/**
 *
 * Redefines component lifecycle methods for auto style un/mounting
 *
 * @param {*} args - Arugments passed by callee
 */
export function redefineLifecycleMethods(...args) {
  [
    redefineRender,
    redefineComponentWillMount,
    redefineComponentWillUnmount
  ].forEach(fn => fn(...args));
}


/**
 *
 * If Component styles have loaded,
 * Component.prototype.render(...) will curry the original method
 * Otherwise, `null` will be returned to avoid FOUC
 *
 * @param {ReactComponent} Component - React component to be unstyled
 * @param {String}         alias     - Component alias
 */
export function redefineRender(Component, alias) {
  let method = 'render';
  let { [method]: fn } = Component.prototype;
  // Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: redefineRender(...)\n' +
    `Expected componentWillMount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  // Update prop descriptor
  let descriptor = Object.getOwnPropertyDescriptor(Component.prototype, method);
  Object.defineProperty(Component.prototype, method, {
    // Merge old descriptor
    ...descriptor,
    // With new value
    value: function render(...args) {
      let state = State.getComponentState(alias);
      let { isStyled } = state;
      return isStyled
        ? fn.call(this, ...args)
        : null;
    }
  });
}

/**
 *
 * Caches component instances and attempts to update styles
 * if component class styles have yet to be loaded
 *
 * @param {ReactComponent} Component - React component to be unstyled
 * @param {String}         alias     - Component alias
 */
export function redefineComponentWillMount(Component, alias) {
  let method = 'componentWillMount';
  let { [method]: fn } = Component.prototype;
  // Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: redefineComponentWillMount(...)\n' +
    `Expected componentWillMount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  // Update prop descriptor
  let descriptor = Object.getOwnPropertyDescriptor(Component.prototype, method);
  Object.defineProperty(Component.prototype, method, {
    // Merge old descriptor
    ...descriptor,
    // With new value
    value: function componentWillMount(...args) {
      // Cache instance
      let numMounted = State.cacheComponentInstance(alias, this);
      // Update styles
      let state = State.getComponentState(alias);
      let { instances, loadingStyles, isStyled, debug, settings } = state;
      let { hot } = settings;
      if (!isStyled && !loadingStyles) {
        // Update styles
        (async () => {
          try {
            let res = await DOM.updateStyle(alias);
          } catch (err) {
            console.error(err);
          }
        })();
      }
      if (fn) return fn.call(this, ...args);
    }
  });
}

/**
 *
 * Removes cached component instance and, if no other instances are mounted,
 * removes component class styles as well
 *
 * @param {ReactComponent} Component - React component to be unstyled
 * @param {String}         alias     - Component alias
 */
export function redefineComponentWillUnmount(Component, alias) {
  let method = 'componentWillUnmount';
  let { [method]: fn } = Component.prototype;
  // Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: redefineComponentWillUnmount(...)\n' +
    `Expected componentWillUnmount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  // Update prop descriptor
  let descriptor = Object.getOwnPropertyDescriptor(Component.prototype, method);
  Object.defineProperty(Component.prototype, method, {
    // Merge old descriptor
    ...descriptor,
    // With new value
    value: function componentWillUnmount(...args) {
      // Clear instance from cache
      let numMounted = State.clearComponentInstance(alias, this);
      // Remove styles
      let state = State.getComponentState(alias);
      let { isStyled, debug, settings } = state;
      let { hot } = settings;
      if (isStyled && numMounted < 1) {
        // Remove styles
        (async () => {
          try {
            await DOM.removeStyle(alias);
          } catch(err) {
            console.error(err);
          }
        })();
      }
      if (fn) return fn.call(this, ...args);
    }
  });
}

/**
 *
 * Gets a component's cssText
 *
 * @param  {String}  alias - Component alias
 * @return {Promise}       - Promise to fulfill component cssText
 */
export async function getComponentCSS(alias) {
  let state = State.getComponentState(alias);
  let { Component, currentTheme, previousTheme, cssText, settings } = state;
  let { styleProp, themeProp, debug } = settings;
  let { hot } = settings;
  let style = Component[styleProp];
  let themes = Component[themeProp];
  let theme = themes ? themes[currentTheme] : undefined;
  let returnValue;
  // Use cached cssText
  if (!hot && cssText && currentTheme !== previousTheme) {
    return cssText;
  }
  // style is a string
  if (typeof style === 'string') {
    returnValue = style;
  }
  // style returns a Promise
  else if (typeof style === 'function') {
    returnValue = await style(theme);
  }
  // TypeError: style is NOT a string or Promise
  else throw new TypeError(
    'Classy Error: getComponentCSS(...)\n' +
    `Expected component ${alias}'s styleProp to be a string or Promise ` +
    'that fulfills with a string.\n' +
    `-> Got type '${typeof style}'.`
  );
  return returnValue;
}
