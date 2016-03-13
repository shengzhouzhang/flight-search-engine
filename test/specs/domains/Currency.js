
import { expect } from 'chai';
import currencyTypes from '../../../src/config/currencyTypes';
import Currency from '../../../src/domains/Currency';

describe('Currency Domain', () => {

  describe('constructor', () => {

    it('should set code and symbol', () => {
      const CURRENCY = currencyTypes.GBP;
      let currency = new Currency(CURRENCY.code, CURRENCY.symbol);
      expect(currency.code).to.eql(CURRENCY.code);
      expect(currency.symbol).to.eql(CURRENCY.symbol);
    });
  });

  describe('fromJson function', () => {

    it('should construct an Object from Json', () => {
      const RAW = currencyTypes.GBP;
      let currency = Currency.fromJson(RAW);
      expect(currency).to.eql(new Currency(RAW.code, RAW.symbol));
    });
  });
});
