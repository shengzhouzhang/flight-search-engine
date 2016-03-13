
import _ from 'lodash';
import TicketTypes from '../../src/config/ticketTypes';
import CurrencyTypes from '../../src/config/currencyTypes';

import Currency from '../../src/domains/Currency';
import { TicketOneWay, TicketReturn } from '../../src/domains/SearchQuery';
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
        CurrencyTypes.fromJson(CurrencyTypes.GBP),
        'PNQ',
        'DEL',
        moment().format('YYYY-MM-DD'),
        _.random(1, 10)
      );
    case TicketTypes.RETURN:
      return new SearchQueryReturn(
        CurrencyTypes.fromJson(CurrencyTypes.GBP),
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

export function genOneWayTickets (searchQuery, size) {
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
          moment(searchQuery.departureDate, 'YYYY-MM-DD').hour(10).minute(0).startOf('minute').valueOf()
        ),
        new Price(searchQuery.currency, _.random(50, 200) * searchQuery.passengers)
      )
    );
}

export function genReturnTickets (searchQuery, size) {
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
