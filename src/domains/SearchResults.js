
import _ from 'lodash';
import SearchQuery from '../domains/SearchQuery';
import Ticket from '../domains/Ticket';

export default class SearchResults {
  static fromJson = (raw = {}) => {
    return new SearchResults(
      SearchQuery.fromJson(raw.searchQuery),
      _.map(raw.tickets, ticket => Ticket.fromJson(ticket))
    );
  };
  constructor (searchQuery, tickets) {
    this.searchQuery = searchQuery;
    this.tickets = tickets;
  };
}
