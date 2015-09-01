/**
 *
 * Classy - Decorator
 *
 * @module lib/decorator
 * @description
 *   Reassigns component lifecycle methods and creates a state object
 */

import * as State from './state';
import * as Class from './class';
import * as DOM from './dom';

/**
 *
 * @Classy(...)
 *
 * @param  {ReactComponent} Component   [description]
 * @param  {Object}         [settings]  [description]
 */
export default function Classy(Component, settings) {
  // Component is a settings object
  if (typeof Component === 'object') {
    return (realComponent) =>
      Classy(realComponent, Component);
  }
  // Component is a class
  else if (
    Component.prototype &&
    Component === Component.prototype.constructor
  ) {
    Class.reassignLifecycleMethods(Component);
    let state = State.createComponentState(Component, settings);
    let { alias: name } = state.settings;
    State.mergeComponentState(name, { loadingStyles: true });
    (async () => {
      try {
        await DOM.updateStyle(name);
      } catch (err) {
        console.error(err);
      } finally {
        State.mergeComponentState(name, { loadingStyles: false });
      }
    })();
  }
  // Component is...something else
  else throw new TypeError(
    'Classy Error: classyDecorate(...)\n' +
    `Expected component to be a class (function).\n` +
    `-> Got type '${typeof Component}'.`
  );
}
