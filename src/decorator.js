/**
 *
 * Classy - Decorator
 *
 * @module lib/decorator
 * @description
 *   Reassigns component lifecycle methods and creates a component state object
 */

import * as State from './state';
import * as Class from './class';
import * as DOM from './dom';

/**
 *
 * ReactComponent class decorator
 *
 * - Decorator usage:
 *   @Classy([settings])
 *
 * - Functional usage:
 *   Classy(Component [, settings])
 *
 * @param  {ReactComponent} Component - Component to be decorated
 * @param  {Object}         settings  - Settings object -- See State.createComponentState(...)
 * @return {ReactComponent}           - Decorated component
 * @example
 *
 *   // ES2016
 *   @Classy
 *   export default class MyComponent extends React.Component { ... }
 *
 *   // ES2015
 *   class MyComponent extends React.Component { ... }
 *   export default Classy(MyComponent);
 *
 *	 // ES5
 *	 var MyComponent = React.createClass({ ... });
 *	 module.exports = Classy(MyComponent);
 *
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
    // Create state object
    let state = State.createComponentState(Component, settings);
    let { alias } = state.settings;
    // Reassign lifecycle methods (mutates Component)
    Class.reassignLifecycleMethods(Component, alias);
    // Update state
    State.mergeComponentState(alias, {
      // component ref
      Component,
      // loading
      loadingStyles: true
    });
    // Update component styles
    (async () => {
      try {
        await DOM.updateStyle(alias);
      } catch (err) {
        console.error(err);
      } finally {
        State.mergeComponentState(alias, {
          // loading complete
          loadingStyles: false
        });
      }
    })();
  }
  // Component is not a class nor a settings object
  else throw new TypeError(
    'Classy Error: classyDecorate(...)\n' +
    `Expected component to be a class (function).\n` +
    `-> Got type '${typeof Component}'.`
  );
  // All done!
  return Component;
}
