
import _ from 'lodash';
import currencyTypes from '../config/currencyTypes';

export default class Currency {
  static fromCode = (code) => {
    let currency = _.find(currencyTypes, currency => currency.code === code);
    if (!currency) { throw new Error(`invalud currency code: ${code}`); }
    console.log(currency);
    return new Currency(currency.code, currency.symbol);
  };
  static fromJson = (raw = {}) => {
    return new Currency(raw.code, raw.symbol);
  };
  constructor (code, symbol) {
    this.code = code;
    this.symbol = symbol;
  };
}
