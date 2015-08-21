/**
 *
 * Classy - Utils
 *
 * @module utils
 * @description
 *   Public utility methods
 */

import * as State from './lib/State';
import * as DOM from './lib/DOM';

/**
 *
 * Classy Public Utils
 *
 * @type {Object}
 */
export default const Utils = {

  /**
   *
   * [setTheme description]
   *
   * @param  {[type]} name         [description]
   * @param  {[type]} currentTheme [description]
   * @param  {[type]} force        [description]
   * @return {Promise}
   */
   async setTheme(name, theme, force=false) {
    let state = State.getComponentState(name)
    let { isStyled, currentTheme, cssText } = state;
    // Component is already styled with specified theme
    if (!force && isStyled && theme === currentTheme) {
      return cssText;
    }
    State.mergeComponentState(name, { currentTheme });
    return await DOM.updateStyle(name);
  },

  /**
   *
   * Curries async updateStyle(...)
   *
   * @param  {[type]} ...args [description]
   * @return {[type]}         [description]
   * @return {Promise}
   */
  async updateStyle(...args) {
    return await DOM.updateStyle(...args);
  },

  /**
   *
   * Curries async removeStyle(...)
   *
   * @param  {[type]} ...args [description]
   * @return {[type]}         [description]
   * @return {Promise}
   */
  async removeStyle(...args) {
    return await DOM.removeStyle(...args);
  },

  /**
   *
   * Curries getComponentState(...)
   *
   * @desc   Curries State.getComponentState(...)
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  getComponentState(name) {
    return State.getComponentState(name);
  },

  /**
   *
   * Manually initalize your component with Classy
   *
   * @param  {[type]} ...args [description]
   * @return {[type]}         [description]
   */
  createComponentState(...args) {
    return State.createComponentState(...args);
  }

};
