
export default class Price {
  static fromJson = (raw = {}) => {
    return new Price(
      raw.symbol,
      raw.value
    );
  };
  constructor (symbol, value) {
    this.symbol = symbol;
    this.value = value;
  };
}
