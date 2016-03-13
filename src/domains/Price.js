
import Currency from '../domains/Currency';

export default class Price {
  static fromJson = (raw = {}) => {
    return new Price(
      Currency.fromJson(raw.currency),
      raw.value
    );
  };
  constructor (currency, value) {
    this.currency = currency;
    this.value = value;
  };
}
