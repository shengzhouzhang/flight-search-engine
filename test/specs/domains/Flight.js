
import moment from 'moment';
import { expect } from 'chai';
import Flight from '../../../src/domains/Flight';

describe('Flight Domain', () => {

  describe('constructor', () => {

    it('should set _id, number, from, destination, departureTime, and arrivalTime', () => {
      const FLIGHT = {
        _id: '0',
        number: 'AI-202',
        from: 'PNQ',
        destination: 'DEL',
        departureTime: moment().valueOf(),
        arrivalTime: moment().valueOf()
      };
      expect(new Flight(
        FLIGHT._id,
        FLIGHT.number,
        FLIGHT.from,
        FLIGHT.destination,
        FLIGHT.departureTime,
        FLIGHT.arrivalTime
      )).to.eql(FLIGHT);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const FLIGHT = {
        _id: '0',
        number: 'AI-202',
        from: 'PNQ',
        destination: 'DEL',
        departureTime: moment().valueOf(),
        arrivalTime: moment().valueOf()
      };
      expect(Flight.fromJson(FLIGHT)).to.eql(new Flight(
        FLIGHT._id,
        FLIGHT.number,
        FLIGHT.from,
        FLIGHT.destination,
        FLIGHT.departureTime,
        FLIGHT.arrivalTime
      ));
    });
  });
});
