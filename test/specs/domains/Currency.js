
import { expect } from 'chai';
import currencyTypes from '../../../src/config/currencyTypes';
import Currency from '../../../src/domains/Currency';

describe('Currency Domain', () => {

  describe('constructor', () => {

    it('should set code and symbol', () => {
      const CURRENCY = currencyTypes.GBP;
      expect(new Currency(CURRENCY.code, CURRENCY.symbol)).to.eql(CURRENCY);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const RAW = currencyTypes.GBP;
      expect(Currency.fromJson(RAW)).to.eql(new Currency(RAW.code, RAW.symbol));
    });
  });
});
