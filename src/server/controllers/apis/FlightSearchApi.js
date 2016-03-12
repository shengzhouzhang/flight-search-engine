
import _ from 'lodash';
import moment from 'moment';
import express from 'express';
import Airline from '../../../domains/Airline';
import Flight from '../../../domains/Flight';
import Price from '../../../domains/Price';
import { TicketOneWay, TicketReturn } from '../../../domains/Ticket';
import ticketTypes from '../../../config/ticketTypes';

export default class FlightSearchApp {
  defaultRouter = express.Router();

  constructor() {
    this.defaultRouter.get('/flights/search', this.search);
  };
  search = (req, res) => {
    let query = req.query;

    switch(query.type) {
      case ticketTypes.ONEWAY:
        return res.status(200)
          .json({
            query: query,
            items: _.range(10).map((index) =>
              new TicketOneWay(
                `ticket-${index}`,
                new Airline(''),
                new Flight(
                  `departure-flight-${index}`,
                  'AI-202',
                  query.from,
                  query.destination,
                  moment(query.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
                  moment(query.departureDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
                ),
                new Price('£', 125 * query.passengers)
              ))
            });
      case ticketTypes.RETURN:
        return res.status(200)
          .json({
            query: query,
            items: _.range(10).map((index) =>
              new TicketReturn(
                `ticket-${index}`,
                new Airline(''),
                new Flight(
                  `departure-flight-${index}`,
                  'AI-202',
                  query.from,
                  query.destination,
                  moment(query.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
                  moment(query.departureDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
                ),
                new Flight(
                  `return-flight-${index}`,
                  'AI-203',
                  query.destination,
                  query.from,
                  moment(query.returnDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
                  moment(query.returnDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
                ),
                new Price('£', 125 * query.passengers)
              ))
            });
        default:
          return res.status(400).json({ message: `invalid ticket type: ${query.type}`});
    }
  };
};
