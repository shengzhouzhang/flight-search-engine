
import _ from 'lodash';
import moment from 'moment';
import TicketTypes from '../../src/config/ticketTypes';
import CurrencyTypes from '../../src/config/currencyTypes';

import Currency from '../../src/domains/Currency';
import Airline from '../../src/domains/Airline';
import Flight from '../../src/domains/Flight';
import Price from '../../src/domains/Price';
import { TicketOneWay, TicketReturn } from '../../src/domains/Ticket';
import { SearchQueryOneWay, SearchQueryReturn } from '../../src/domains/SearchQuery';
import SearchResults from '../../src/domains/SearchResults';

export function genSearchResults (ticketType, size) {
  let SearchQuery = genSearchQuery(ticketType);
  return new SearchResults(SearchQuery, genOneWayTickets(searchQuery, size))
}

export function genSearchQuery (ticketType) {
  switch (ticketType) {
    case TicketTypes.ONEWAY:
      return new SearchQueryOneWay(
        Currency.fromJson(CurrencyTypes.GBP),
        'PNQ',
        'DEL',
        moment().format('YYYY-MM-DD'),
        _.random(1, 10)
      );
    case TicketTypes.RETURN:
      return new SearchQueryReturn(
        Currency.fromJson(CurrencyTypes.GBP),
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
    case TicketTypes.ONEWAY:
      return genOneWayTickets(searchQuery, size);
    case TicketTypes.RETURN:
      return genReturnTickets(searchQuery, size);
    default:
      throw new Error(`invalid ticket type: ${ticketType}`);
  }
}

export function genTicket (key, ticketType) {
  let searchQuery = genSearchQuery(ticketType);
  switch (ticketType) {
    case TicketTypes.ONEWAY:
      return genOneWayTicket(key, searchQuery);
    case TicketTypes.RETURN:
      return genReturnTicket(key, searchQuery);
    default:
      throw new Error(`invalid ticket type: ${ticketType}`);
  }
}

export function genOneWayTickets (searchQuery, size) {
  return _.range(size)
    .map((index) => genOneWayTicket(key, searchQuery));
}

export function genOneWayTicket (key, searchQuery) {
  return new TicketOneWay(
    `ticket-${key}`,
    new Airline(''),
    new Flight(
      `departure-flight-${key}`,
      'AI-202',
      searchQuery.from,
      searchQuery.destination,
      moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf()
    ),
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
    new Airline(''),
    new Flight(
      `departure-flight-${key}`,
      'AI-202',
      searchQuery.from,
      searchQuery.destination,
      moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
      moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
    ),
    new Flight(
      `return-flight-${key}`,
      'AI-203',
      searchQuery.destination,
      searchQuery.from,
      moment(searchQuery.returnDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf(),
      moment(searchQuery.returnDate, 'YYYY-MM-DD').hour(12).minute(0).startOf('minute').valueOf()
    ),
    genPrice(searchQuery.currency, searchQuery.passengers)
  );
}

export function genPrice (currency, passengers) {
  return new Price(currency, _.random(50, 200) * passengers);
}

export function randomPrice () {
  return new Price(Currency.fromJson(CurrencyTypes.GBP), _.random(50, 200) * _.random(1, 10));
}
