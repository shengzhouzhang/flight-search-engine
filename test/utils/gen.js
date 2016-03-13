
import _ from 'lodash';
import moment from 'moment';
import ticketTypes from '../../src/config/ticketTypes';
import currencyTypes from '../../src/config/currencyTypes';

import Currency from '../../src/domains/Currency';
import Airline from '../../src/domains/Airline';
import Flight from '../../src/domains/Flight';
import Price from '../../src/domains/Price';
import { TicketOneWay, TicketReturn } from '../../src/domains/Ticket';
import { SearchQueryOneWay, SearchQueryReturn } from '../../src/domains/SearchQuery';
import SearchResults from '../../src/domains/SearchResults';

export function genSearchResults (ticketType, size) {
  let searchQuery = genSearchQuery(ticketType);
  return new SearchResults(searchQuery, genOneWayTickets(searchQuery, size))
}

export function genSearchQuery (ticketType) {
  switch (ticketType) {
    case ticketTypes.ONEWAY:
      return new SearchQueryOneWay(
        Currency.fromJson(currencyTypes.GBP),
        'PNQ',
        'DEL',
        moment().format('YYYY-MM-DD'),
        _.random(1, 10)
      );
    case ticketTypes.RETURN:
      return new SearchQueryReturn(
        Currency.fromJson(currencyTypes.GBP),
        'PNQ',
        'DEL',
        moment().format('YYYY-MM-DD'),
        moment().add(1, 'day').format('YYYY-MM-DD'),
        _.random(1, 10)
      );
    default:
      throw new Error(`invalid ticket type: ${ticketType}`);
  }
}

export function genTickets (searchQuery, size) {
  switch (searchQuery.ticketType) {
    case ticketTypes.ONEWAY:
      return genOneWayTickets(searchQuery, size);
    case ticketTypes.RETURN:
      return genReturnTickets(searchQuery, size);
    default:
      throw new Error(`invalid ticket type: ${ticketType}`);
  }
}

export function genTicket (key, ticketType) {
  let searchQuery = genSearchQuery(ticketType);
  switch (ticketType) {
    case ticketTypes.ONEWAY:
      return genOneWayTicket(key, searchQuery);
    case ticketTypes.RETURN:
      return genReturnTicket(key, searchQuery);
    default:
      throw new Error(`invalid ticket type: ${ticketType}`);
  }
}

export function genOneWayTickets (searchQuery, size) {
  return _.range(size)
    .map((index) => genOneWayTicket(index, searchQuery));
}

export function genOneWayTicket (key, searchQuery) {
  return new TicketOneWay(
    `ticket-${key}`,
    genAirline(),
    genDepartureFlight(key, searchQuery),
    genPrice(searchQuery.currency, searchQuery.passengers)
  );
}

export function genReturnTickets (searchQuery, size) {
  return _.range(size)
    .map((index) => genReturnTicket(index, searchQuery));
}

export function genReturnTicket (key, searchQuery) {
  return new TicketReturn(
    `ticket-${key}`,
    genAirline(),
    genDepartureFlight(key, searchQuery),
    genReturnFlight(key, searchQuery),
    genPrice(searchQuery.currency, searchQuery.passengers)
  );
}

export function genAirline () {
  return new Airline('');
}

export function genDepartureFlight(key, searchQuery) {
  return new Flight(
    `departure-flight-${key}`,
    'AI-202',
    searchQuery.from,
    searchQuery.destination,
    moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
    moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
  );
}

export function genReturnFlight(key, searchQuery) {
  return new Flight(
    `return-flight-${key}`,
    'AI-203',
    searchQuery.destination,
    searchQuery.from,
    moment(searchQuery.returnDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
    moment(searchQuery.returnDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
  );
}

export function genPrice (currency, passengers) {
  return new Price(currency, _.random(50, 200) * passengers);
}

export function randomFlight (key) {
  let ticketType = ticketTypes.ONEWAY;
  let searchQuery = genSearchQuery(ticketType);
  switch (ticketType) {
    case ticketTypes.ONEWAY:
      return genDepartureFlight(key, searchQuery);
    case ticketTypes.RETURN:
      return genReturnFlight(key, searchQuery);
    default:
      throw new Error(`invalid ticket type: ${ticketType}`);
  }
}

export function randomPrice () {
  return new Price(Currency.fromJson(currencyTypes.GBP), _.random(50, 200) * _.random(1, 10));
}
