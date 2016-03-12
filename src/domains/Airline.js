
export default class Airline {
  static fromJson = (raw = {}) => {
    return new Airline(
      raw.logo.imageUri
    );
  };
  constructor (logoUri) {
    this.logo = { imageUri: logoUri };
  };
}
