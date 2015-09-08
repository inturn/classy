/**
 *
 * Classy - DOM Helpers
 *
 * @module lib/DOM
 * @description
 *   Helpers for adding/removing Classy component styles to/from the DOM
 */

import * as State from './state';
import * as Class from './class';
import Utils from './utils';

/**
 *
 * Creates a component's <style> tag and updates its cssText
 *
 * @param  {String}  alias - Component alias
 * @return {Promise}       - Promise to fulfill component cssText
 */
export async function updateStyle(alias) {
  let state = State.getComponentState(alias);
  State.mergeComponentState(alias, { loadingStyles: true });
  let { Component, settings } = state;
  let { appendTo, elemId, elemProps, debug } = settings;
  let parent = document.querySelector(appendTo);
  // Can't find parent node
  if (!parent) throw new ReferenceError(
    // appendTo element could not be selected
    // ...
  );
  let cssText = await Class.getComponentCSS(alias);
  // Create <style>
  let style = (
    document.getElementById(elemId) ||
    document.createElement('style')
  );
  style.id = style.id || elemId;
  for (let prop in elemProps) {
    if (!elemProps.hasOwnProperty(prop)) continue;
    style[prop] = elemProps[prop];
  }
  style.type = style.type || elemProps;
  style.innerHTML = cssText;
  parent.appendChild(style);
  // Update component state
  State.mergeComponentState(alias, {
    isStyled: true,
    cssText,
    loadingStyles: false
  });
  // Re-render component instances
  State.getComponentInstances(alias).forEach(
    c => c.forceUpdate()
  );
  // Handle subscriptions
  Utils.publish(alias, 'updateStyle');
  // Debug
  if (debug) console.debug(
    'Classy Debug: updateStyle(...)\n',
    `${alias} cssText:
    `,
    cssText
  );
  return cssText;
}

/**
 *
 * Removes a component's <style> tag
 *
 * @param  {String}  alias - Component alias
 * @return {Promise}
 */
export async function removeStyle(alias) {
  let state = State.getComponentState(alias);
  let { settings } = state;
  let { debug, elemId } = settings;
  let style = document.getElementById(elemId);
  if (!style) return console.warn(
    // <style id={elemId}> could not be selected
    // ...
  );
  if (style.remove) style.remove();
  else style.parentElement.removeChild(style);
  State.mergeComponentState(alias, {
    isStyled: false,
    cssText: undefined
  });
  // Handle subscriptions
  Utils.publish(alias, 'removeStyle');
  // Debug
  if (debug) console.debug(
    'Classy Debug: removeStyle(...)\n',
    `${alias} styles were removed`
  );
}
