
import moment from 'moment';
import { expect } from 'chai';
import ticketTypes from '../../../src/config/ticketTypes';
import currencyTypes from '../../../src/config/currencyTypes';
import Airline from '../../../src/domains/Airline';
import Flight from '../../../src/domains/Flight';
import Price from '../../../src/domains/Price';
import Currency from '../../../src/domains/Currency';
import Ticket, { TicketOneWay, TicketReturn } from '../../../src/domains/Ticket';

describe('Ticket Domain', () => {

  describe('fromJson function', () => {

    it('should construct a TicketOneWay object from Json', () => {
      const TICKET = {
        _id: '0',
        type: ticketTypes.ONEWAY,
        airline: { logo: { imageUri: '' } },
        departureFlight: {
          _id: '0',
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        price: {
          currency: currencyTypes.GBP,
          value: 100
        }
      };
      expect(Ticket.fromJson(TICKET)).to.eql(new TicketOneWay(
        TICKET._id,
        Airline.fromJson(TICKET.airline),
        Flight.fromJson(TICKET.departureFlight),
        Price.fromJson(TICKET.price)
      ));
    });

    it('should construct a TicketReturn object from Json', () => {
      const TICKET = {
        _id: '0',
        type: ticketTypes.RETURN,
        airline: { logo: { imageUri: '' } },
        departureFlight: {
          _id: '0',
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        returnFlight: {
          _id: '0',
          number: 'AI-203',
          from: 'DEL',
          destination: 'PNQ',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        price: {
          currency: currencyTypes.GBP,
          value: 100
        }
      };
      expect(Ticket.fromJson(TICKET)).to.eql(new TicketReturn(
        TICKET._id,
        Airline.fromJson(TICKET.airline),
        Flight.fromJson(TICKET.departureFlight),
        Flight.fromJson(TICKET.returnFlight),
        Price.fromJson(TICKET.price)
      ));
    });
  });
});

describe('TicketOneWay Domain', () => {

  describe('constructor', () => {

    it('should set _id, airline, departureFlight, and price', () => {
      const TICKET = {
        _id: '0',
        type: ticketTypes.ONEWAY,
        airline: { logo: { imageUri: '' } },
        departureFlight: {
          _id: '0',
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        price: {
          currency: currencyTypes.GBP,
          value: 100
        }
      };
      expect(new TicketOneWay(
        TICKET._id,
        Airline.fromJson(TICKET.airline),
        Flight.fromJson(TICKET.departureFlight),
        Price.fromJson(TICKET.price)
      )).to.eql(TICKET);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const TICKET = {
        _id: '0',
        type: ticketTypes.ONEWAY,
        airline: { logo: { imageUri: '' } },
        departureFlight: {
          _id: '0',
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        price: {
          currency: currencyTypes.GBP,
          value: 100
        }
      };
      expect(TicketOneWay.fromJson(TICKET)).to.eql(new TicketOneWay(
        TICKET._id,
        Airline.fromJson(TICKET.airline),
        Flight.fromJson(TICKET.departureFlight),
        Price.fromJson(TICKET.price)
      ));
    });
  });
});

describe('TicketReturn Domain', () => {

  describe('constructor', () => {

    it('should set _id, airline, departureFlight, returnFlight, and price', () => {
      const TICKET = {
        _id: '0',
        type: ticketTypes.RETURN,
        airline: { logo: { imageUri: '' } },
        departureFlight: {
          _id: '0',
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        returnFlight: {
          _id: '0',
          number: 'AI-203',
          from: 'DEL',
          destination: 'PNQ',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        price: {
          currency: currencyTypes.GBP,
          value: 100
        }
      };
      expect(new TicketReturn(
        TICKET._id,
        Airline.fromJson(TICKET.airline),
        Flight.fromJson(TICKET.departureFlight),
        Flight.fromJson(TICKET.returnFlight),
        Price.fromJson(TICKET.price)
      )).to.eql(TICKET);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const TICKET = {
        _id: '0',
        type: ticketTypes.RETURN,
        airline: { logo: { imageUri: '' } },
        departureFlight: {
          _id: '0',
          number: 'AI-202',
          from: 'PNQ',
          destination: 'DEL',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        returnFlight: {
          _id: '0',
          number: 'AI-203',
          from: 'DEL',
          destination: 'PNQ',
          departureTime: moment().valueOf(),
          arrivalTime: moment().valueOf()
        },
        price: {
          currency: currencyTypes.GBP,
          value: 100
        }
      };
      expect(TicketReturn.fromJson(TICKET)).to.eql(new TicketReturn(
        TICKET._id,
        Airline.fromJson(TICKET.airline),
        Flight.fromJson(TICKET.departureFlight),
        Flight.fromJson(TICKET.returnFlight),
        Price.fromJson(TICKET.price)
      ));
    });
  });
});
