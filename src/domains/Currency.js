
import _ from 'lodash';
import currencyTypes from '../config/currencyTypes';

export default class Currency {
  static fromJson = (raw = {}) => {
    return new Currency(raw.code, raw.symbol);
  };
  constructor (code, symbol) {
    this.code = code;
    this.symbol = symbol;
  };
}
