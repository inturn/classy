'use strict';

import { expect } from 'chai';
import reactDOM from 'react-dom';
import * as Utils from '../src/utils';
import {
  Button,
  ToggleButton,
  App
} from './components.min'; // test with minified script
const render = ::TestUtils.renderIntoDocument;
const find = ::reactDOM.findDOMNode;
const sub = ::Utils.subscribe;
const unsub = ::Utils.unsubscribe;
const reset = ::Utils.resetAllInternalStates;
const getStyle = ::window.getComputedStyle;

describe('component', () => {

  beforeEach(function() {
    reset();
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  describe('Button', () => {

    it('should apply styles', (done) => {
      let button = render(
        <Button />
      );
      sub('Button', 'updateStyle', () => {
        try {
          let node = find(button.refs.button);
          let style = getStyle(node);
          expect(style.background).to.equal('blue');
          unsub('Button', 'updateStyle');
          done();
        } catch(err) {
          done(err);
        }
      });
    });

  });

  describe('ToggleButton', () => {

    it('should apply styles', (done) => {
      let toggle = render(
        <ToggleButton />
      );
      sub('ToggleButton', 'updateStyle', () => {
        try {
          let node = find(toggle.refs.button);
          expect(getStyle(node).background)
            .to.equal('red');
          toggle.toggle();
          expect(getStyle(node).background)
            .to.equal('green');
          unsub('ToggleButton', 'updateStyle');
          done();
        } catch(err) {
          done(err);
        }
      });
    });

  });

  describe('App', () => {

    it('should apply styles to container', (done) => {
      let app = render(
        <App />
      );
      sub('App', 'updateStyle', () => {
        try {
          {
            let node = find(app.refs.container);
            let style = getStyle(node);
            expect(style.background).to.equal('white');
          }
          {
            let node = find(app.refs.toggle.refs.button);
            let style = getStyle(node);
            expect(style.background).to.equal('red');
          }
          unsub('App', 'updateStyle');
          done();
        } catch(err) {
          done(err);
        }
      });
    });

    it('should apply styles to children', (done) => {
      let app = render(
        <App />
      );
      app.refs.toggle.on();
      sub('App', 'updateStyle', () => {
        try {
          let node = find(app.refs.toggle.refs.button);
          let style = getStyle(node);
          expect(style.background).to.equal('green');
          unsub('App', 'updateStyle');
          done();
        } catch(err) {
          done(err);
        }
      });
    });

  });

});
