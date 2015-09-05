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
 * Reassigns component lifecycle methods for auto style un/mounting
 *
 * @param {*} args - Arugments passed by callee
 */
export function reassignLifecycleMethods(...args) {
  [
    reassignComponentWillMount,
    reassignComponentWillUnmount
  ].forEach(fn => fn(...args));
}

/**
 *
 * Updates styles before component mounts
 *
 * @param  {ReactComponent} Component - React component to be styled
 */
export function reassignComponentWillMount(Component, alias) {
  let { componentWillMount: fn } = Component.prototype;
  // Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: reassignComponentWillMount(...)\n' +
    `Expected componentWillMount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  // Update prop descriptor
  Object.defineProperty(Component.prototype, 'componentWillMount', {
    writable: true,
    value: function componentWillMount(...args) {
      let state = State.getComponentState(alias);
      let { loadingStyles, isStyled, debug, settings } = state;
      let { hot } = settings;
      State.incrProp(alias, 'numMounted');
      if (hot || !isStyled && !loadingStyles) {
        State.mergeComponentState(alias, { loadingStyles: true });
        (async () => {
          try {
            let res = await DOM.updateStyle(alias);
          } catch (err) {
            console.error(err);
          } finally {
            State.mergeComponentState(alias, { loadingStyles: false });
          }
        })();
      }
      if (fn) return fn.call(this, ...args);
    }
  });
}

/**
 *
 * Removes styles before component unmounts
 *
 * @param  {ReactComponent} Component - React component to be unstyled
 */
export function reassignComponentWillUnmount(Component, alias) {
  let { componentWillUnmount: fn } = Component.prototype;
  // Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: reassignComponentWillUnmount(...)\n' +
    `Expected componentWillUnmount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  // Update prop descriptor
  Object.defineProperty(Component.prototype, 'componentWillUnmount', {
    writable: true,
    value: function componentWillUnmount(...args) {
      let state = State.getComponentState(alias);
      let { isStyled, debug, settings } = state;
      let { hot } = settings;
      State.decrProp(alias, 'numMounted');
      if (hot || isStyled && State.getComponentState(alias).numMounted < 1) {
        DOM.removeStyle(alias).catch(console.error.bind(console));
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
