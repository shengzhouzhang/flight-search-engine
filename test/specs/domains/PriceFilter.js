
import { expect } from 'chai';
import PriceFilter from '../../../src/domains/PriceFilter';

describe('PriceFilter Domain', () => {

  describe('constructor', () => {

    it('should set min and max', () => {
      const FILTER = { min: 0, max: 100 };
      expect(new PriceFilter(FILTER.min, FILTER.max)).to.eql(FILTER);
    });
  });
});
