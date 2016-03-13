
import moment from 'moment';
import { expect } from 'chai';
import ticketTypes from '../../../src/config/ticketTypes';
import currencyTypes from '../../../src/config/currencyTypes';
import Airline from '../../../src/domains/Airline';
import Flight from '../../../src/domains/Flight';
import Price from '../../../src/domains/Price';
import Currency from '../../../src/domains/Currency';
import SearchQuery, { SearchQueryOneWay, SearchQueryReturn } from '../../../src/domains/SearchQuery';

describe('SearchQuery Domain', () => {

  describe('fromJson function', () => {

    it('should construct a SearchQueryOneWay object from Json', () => {
      const QUERY = {
        ticketType: ticketTypes.ONEWAY,
        currency: currencyTypes.GBP,
        from: 'PNQ',
        destination: 'DEL',
        departureDate: moment().format('YYYY-MM-DD'),
        passengers: 3
      };
      expect(SearchQuery.fromJson(QUERY)).to.eql(new SearchQueryOneWay(
        Currency.fromJson(QUERY.currency),
        QUERY.from,
        QUERY.destination,
        QUERY.departureDate,
        QUERY.passengers,
      ));
    });

    it('should construct a SearchQueryReturn object from Json', () => {
      const QUERY = {
        ticketType: ticketTypes.RETURN,
        currency: currencyTypes.GBP,
        from: 'PNQ',
        destination: 'DEL',
        departureDate: moment().format('YYYY-MM-DD'),
        returnDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        passengers: 3
      };
      expect(SearchQuery.fromJson(QUERY)).to.eql(new SearchQueryReturn(
        Currency.fromJson(QUERY.currency),
        QUERY.from,
        QUERY.destination,
        QUERY.departureDate,
        QUERY.returnDate,
        QUERY.passengers,
      ));
    });
  });
});

describe('SearchQueryOneWay Domain', () => {

  describe('constructor', () => {

    it('should set currency, from, destination, departureDate, and passengers', () => {
      const QUERY = {
        ticketType: ticketTypes.ONEWAY,
        currency: currencyTypes.GBP,
        from: 'PNQ',
        destination: 'DEL',
        departureDate: moment().format('YYYY-MM-DD'),
        passengers: 3
      };
      expect(new SearchQueryOneWay(
        Currency.fromJson(QUERY.currency),
        QUERY.from,
        QUERY.destination,
        QUERY.departureDate,
        QUERY.passengers,
      )).to.eql(QUERY);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const QUERY = {
        ticketType: ticketTypes.ONEWAY,
        currency: currencyTypes.GBP,
        from: 'PNQ',
        destination: 'DEL',
        departureDate: moment().format('YYYY-MM-DD'),
        passengers: 3
      };
      expect(SearchQueryOneWay.fromJson(QUERY)).to.eql(new SearchQueryOneWay(
        Currency.fromJson(QUERY.currency),
        QUERY.from,
        QUERY.destination,
        QUERY.departureDate,
        QUERY.passengers,
      ));
    });
  });
});

describe('SearchQueryReturn Domain', () => {

  describe('constructor', () => {

    it('should set currency, from, destination, departureDate, returnDate, and passengers', () => {
      const QUERY = {
        ticketType: ticketTypes.RETURN,
        currency: currencyTypes.GBP,
        from: 'PNQ',
        destination: 'DEL',
        departureDate: moment().format('YYYY-MM-DD'),
        returnDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        passengers: 3
      };
      expect(new SearchQueryReturn(
        Currency.fromJson(QUERY.currency),
        QUERY.from,
        QUERY.destination,
        QUERY.departureDate,
        QUERY.returnDate,
        QUERY.passengers,
      )).to.eql(QUERY);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const QUERY = {
        ticketType: ticketTypes.RETURN,
        currency: currencyTypes.GBP,
        from: 'PNQ',
        destination: 'DEL',
        departureDate: moment().format('YYYY-MM-DD'),
        returnDate: moment().add(1, 'day').format('YYYY-MM-DD'),
        passengers: 3
      };
      expect(SearchQueryReturn.fromJson(QUERY)).to.eql(new SearchQueryReturn(
        Currency.fromJson(QUERY.currency),
        QUERY.from,
        QUERY.destination,
        QUERY.departureDate,
        QUERY.returnDate,
        QUERY.passengers,
      ));
    });
  });
});
