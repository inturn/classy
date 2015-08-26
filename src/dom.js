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

/**
 *
 * [updateStyle description]
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 * @return {Promise}
 */
export async function updateStyle(name) {
  let state = State.getComponentState(name);
  let { settings } = state;
  let { appendTo, elemId, elemProps, debug } = settings;
  let parent = document.querySelector(appendTo);
  // Can't find parent node
  if (!parent) throw new ReferenceError(
    // appendTo element could not be selected
    // ...
  );
  let cssText = await Class.getComponentCSS(name);
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
  State.mergeComponentState({
    isStyled: true,
    cssText
  });
  if (debug) console.debug(
    'Classy Debug: updateStyle(...)\n',
    name+'\n',
    cssText
  );
  return cssText;
}

/**
 *
 * [removeStyle description]
 *
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 * @return {Promise}
 */
export async function removeStyle(name) {
  let state = State.getComponentState(name);
  let { settings } = state;
  let { elemId } = settings;
  let style = document.getElementById(elemId);
  if (!style) return console.warn(
    // <style id={elemId}> could not be selected
    // ...
  );
  if (style.remove) style.remove();
  else style.parentElement.removeChild(style);
  State.mergeComponentState({
    isStyled: false,
    cssText: undefined
  });
  if (debug) console.debug(
    'Classy Debug: removeStyle(...)\n',
    name
  );
}
