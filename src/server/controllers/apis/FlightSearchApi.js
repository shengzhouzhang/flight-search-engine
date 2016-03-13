
import _ from 'lodash';
import moment from 'moment';
import express from 'express';
import Airline from '../../../domains/Airline';
import Flight from '../../../domains/Flight';
import Price from '../../../domains/Price';
import { TicketOneWay, TicketReturn } from '../../../domains/Ticket';
import SearchQuery from '../../../domains/SearchQuery';
import SearchResults from '../../../domains/SearchResults';
import ticketTypes from '../../../config/ticketTypes';

export default class FlightSearchApp {
  defaultRouter = express.Router();

  constructor() {
    this.defaultRouter.post('/flight-tickets/search', this.search);
  };
  search = (req, res) => {
    let searchQuery = SearchQuery.fromJson(req.body);
    switch(searchQuery.ticketType) {
      case ticketTypes.ONEWAY:
        return res.status(200)
          .json(new SearchResults(searchQuery, genOneWayTickets(10, searchQuery)));
      case ticketTypes.RETURN:
        return res.status(200)
          .json(new SearchResults(searchQuery, genReturnTickets(10, searchQuery)));
        default:
          return res.status(400).json({ message: `invalid ticket type: ${searchQuery.ticketType}`});
    }
  };
};

export function genOneWayTickets (size, searchQuery) {
  return _.range(size)
    .map((index) =>
      new TicketOneWay(
        `ticket-${index}`,
        new Airline(''),
        new Flight(
          `departure-flight-${index}`,
          'AI-202',
          searchQuery.from,
          searchQuery.destination,
          moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
          moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
        ),
        new Price(searchQuery.currency, _.random(50, 200) * searchQuery.passengers)
      )
    );
}

export function genReturnTickets (size, searchQuery) {
  return _.range(size)
    .map((index) =>
      new TicketReturn(
        `ticket-${index}`,
        new Airline(''),
        new Flight(
          `departure-flight-${index}`,
          'AI-202',
          searchQuery.from,
          searchQuery.destination,
          moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
          moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
        ),
        new Flight(
          `return-flight-${index}`,
          'AI-203',
          searchQuery.destination,
          searchQuery.from,
          moment(searchQuery.returnDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
          moment(searchQuery.returnDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
        ),
        new Price(searchQuery.currency, _.random(50, 200) * searchQuery.passengers)
    )
  );
}
