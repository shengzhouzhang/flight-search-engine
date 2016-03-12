
import ticketTypes from '../config/ticketTypes';

export class TicketOneWay {
  constructor (_id, airline, departureFlight, price) {
    this._id = _id;
    this.type = ticketTypes.ONEWAY;
    this.airline = airline;
    this.departureFlight = departureFlight;
    this.price = price;
  };
}

export class TicketReturn {
  constructor (_id, airline, departureFlight, returnFlight, price) {
    this._id = _id;
    this.type = ticketTypes.RETURN;
    this.airline = airline;
    this.departureFlight = departureFlight;
    this.returnFlight = returnFlight;
    this.price = price;
  };
}
