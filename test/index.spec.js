'use strict';

import { expect } from 'chai';

describe('main module', () => {

  it('should re-export expected submodules', () => {
    const Classy = require('../src/index');
    const decorator = require('../src/decorator');
    const utils = require('../src/utils');
    expect(Classy.default).to.be.a('function');
    expect(Classy.default).to.equal(Classy.Classy);
    expect(Classy.default).to.equal(decorator.default);
    expect(Classy.Utils).to.be.an('object');
    expect(Classy.Utils).to.equal(utils);
  });

});
