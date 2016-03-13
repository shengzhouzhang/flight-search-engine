
import { expect } from 'chai';
import Airline from '../../../src/domains/Airline';

describe('Airline Domain', () => {

  describe('constructor', () => {

    it('should set logo image uri', () => {
      const AIRLINE = { logo: { imageUri: 'IMAGE_URI' }};
      expect(new Airline(AIRLINE.logo.imageUri)).to.eql(AIRLINE);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const AIRLINE = { logo: { imageUri: 'IMAGE_URI' }};
      expect(Airline.fromJson(AIRLINE)).to.eql(new Airline(AIRLINE.logo.imageUri));
    });
  });
});
