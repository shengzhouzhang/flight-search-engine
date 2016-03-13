
import ticketTypes from '../config/ticketTypes';
import Currency from '../domains/Currency';

export default class SearchQuery {
  static fromJson = (raw = {}) => {
    switch (raw.ticketType) {
      case ticketTypes.ONEWAY:
        return SearchQueryOneWay.fromJson(raw);
      case ticketTypes.RETURN:
        return SearchQueryReturn.fromJson(raw);
      default:
        throw new Error(`invalid ticket type: ${raw.ticketType}`);
    }
  };
}

export class SearchQueryOneWay {
  static fromJson = (raw = {}) => {
    return new SearchQueryOneWay(
      Currency.fromJson(raw.currency),
      raw.from,
      raw.destination,
      raw.departureDate,
      raw.passengers
    );
  };
  constructor (currency, from, destination, departureDate, passengers) {
    this.ticketType = ticketTypes.ONEWAY;
    this.currency = currency;
    this.from = from;
    this.destination = destination;
    this.departureDate = departureDate;
    this.passengers = passengers;
  };
}

export class SearchQueryReturn {
  static fromJson = (raw = {}) => {
    return new SearchQueryReturn(
      Currency.fromJson(raw.currency),
      raw.from,
      raw.destination,
      raw.departureDate,
      raw.returnDate,
      raw.passengers
    );
  };
  constructor (currency, from, destination, departureDate, returnDate, passengers) {
    this.ticketType = ticketTypes.RETURN;
    this.currency = currency;
    this.from = from;
    this.destination = destination;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
    this.passengers = passengers;
  };
}
