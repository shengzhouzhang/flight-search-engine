
import moment from 'moment';
import { expect } from 'chai';
import currencyTypes from '../../../src/config/currencyTypes';
import Currency from '../../../src/domains/Currency';
import Price from '../../../src/domains/Price';

describe('Price Domain', () => {

  describe('constructor', () => {

    it('should set currency and value', () => {
      const PRICE = {
        currency: currencyTypes.GBP,
        value: 100
      };
      expect(new Price(Currency.fromJson(PRICE.currency), PRICE.value)).to.eql(PRICE);
    });
  });

  describe('fromJson function', () => {

    it('should construct an Object from Json', () => {
      const PRICE = {
        currency: currencyTypes.GBP,
        value: 100
      };
      expect(Price.fromJson(PRICE)).to.eql(
        new Price(Currency.fromJson(PRICE.currency), PRICE.value));
    });
  });
});
