
import { expect } from 'chai';
import Airline from '../../../src/domains/Airline';

describe('Airline Domain', () => {

  describe('constructor', () => {

    it('should set logo image uri', () => {
      const IMAGE_URI = 'IMAGE_URI';
      let airline = new Airline(IMAGE_URI);
      expect(airline.logo.imageUri).to.eql(IMAGE_URI);
    });
  });

  describe('fromJson function', () => {

    it('should construct an Object from Json', () => {
      const IMAGE_URI = 'IMAGE_URI';
      const RAW = { logo: { imageUri: IMAGE_URI }};
      let airline = Airline.fromJson(RAW);
      expect(airline).to.eql(new Airline(IMAGE_URI));
    });
  });
});
