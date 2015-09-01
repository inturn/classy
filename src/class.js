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
export function reassignComponentWillMount(Component) {
  let { componentWillMount: fn } = Component.prototype;
  // TypeError: Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: reassignComponentWillMount(...)\n' +
    `Expected componentWillMount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  let { name } = Component;
  // Reassign
  Object.defineProperty(Component.prototype, 'componentWillMount', {
    writable: true,
    value: function componentWillMount(...args) {
      let state = State.getComponentState(name);
      let { loadingStyles, isStyled, debug, settings } = state;
      let { hot } = settings;
      State.incrProp(name, 'numMounted');
      if (hot || !isStyled && !loadingStyles) {
        State.mergeComponentState(name, { loadingStyles: true });
        (async () => {
          try {
            let res = await DOM.updateStyle(name);
          } catch (err) {
            console.error(err);
          } finally {
            State.mergeComponentState(name, { loadingStyles: false });
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
export function reassignComponentWillUnmount(Component) {
  let { componentWillUnmount: fn } = Component.prototype;
  // TypeError: Component is NOT a class
  if (fn && typeof fn !== 'function') throw new TypeError(
    'Classy Error: reassignComponentWillUnmount(...)\n' +
    `Expected componentWillUnmount(...) to be a function.\n` +
    `-> Got type ${typeof fn}`
  );
  let { name } = Component;
  // Reassign
  Object.defineProperty(Component.prototype, 'componentWillUnmount', {
    writable: true,
    value: function componentWillUnmount(...args) {
      let state = State.getComponentState(name);
      let { isStyled, debug, settings } = state;
      let { hot } = settings;
      State.decrProp(name, 'numMounted');
      if (hot || isStyled) {
        DOM.removeStyle(name).catch(console.error.bind(console));
      }
      if (fn) return fn.call(this, ...args);
    }
  });
}

/**
 *
 * Gets a component's cssText
 *
 * @param  {String}  name - Component name
 * @return {Promise}      - Promise to fulfill component cssText
 */
export async function getComponentCSS(name) {
  let state = State.getComponentState(name);
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
    `Expected component ${name}'s styleProp to be a string or Promise ` +
    'that fulfills with a string.\n' +
    `-> Got type '${typeof style}'.`
  );
  return returnValue;
}
