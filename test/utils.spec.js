'use strict';

import { expect } from 'chai';

describe('Utils module', () => {

  it('should create "hash" with correct length', () => {
    let { genHash } = require('../src/utils');
    for (let i = 0; i < 100; ++i) {
      let len = Math.round(Number(Math.random().toFixed(2))*100);
      if (len > 36) while (len > 36) len = Math.round(Number(Math.random().toFixed(2))*100);
      let hash = genHash(len);
      expect(hash.length).to.equal(len);
    }
  });

});
