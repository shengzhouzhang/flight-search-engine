
import Airline from '../domains/Airline';
import Flight from '../domains/Flight';
import Price from '../domains/Price';
import ticketTypes from '../config/ticketTypes';

export default class Ticket {
  static fromJson = (raw = {}) => {
    switch (raw.type) {
      case ticketTypes.ONEWAY:
        return TicketOneWay.fromJson(raw);
      case ticketTypes.RETURN:
        return TicketReturn.fromJson(raw);
      default:
        throw new Error(`invalid ticket type: ${raw.type}`);
    }
  };
}

export class TicketOneWay {
  static fromJson = (raw = {}) => {
    return new TicketOneWay(
      raw._id,
      Airline.fromJson(raw.airline),
      Flight.fromJson(raw.departureFlight),
      Price.fromJson(raw.price)
    );
  };
  constructor (_id, airline, departureFlight, price) {
    this._id = _id;
    this.type = ticketTypes.ONEWAY;
    this.airline = airline;
    this.departureFlight = departureFlight;
    this.price = price;
  };
}

export class TicketReturn {
  static fromJson = (raw = {}) => {
    return new TicketReturn(
      raw._id,
      Airline.fromJson(raw.airline),
      Flight.fromJson(raw.departureFlight),
      Flight.fromJson(raw.returnFlight),
      Price.fromJson(raw.price)
    );
  };
  constructor (_id, airline, departureFlight, returnFlight, price) {
    this._id = _id;
    this.type = ticketTypes.RETURN;
    this.airline = airline;
    this.departureFlight = departureFlight;
    this.returnFlight = returnFlight;
    this.price = price;
  };
}
