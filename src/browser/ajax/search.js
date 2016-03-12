
import _ from 'lodash';
import { GET } from '../../browser/ajax/request';
import Ticket from '../../domains/Ticket';
import Airline from '../../domains/Airline';
import Flight from '../../domains/Flight';
import Price from '../../domains/Price';

export function search (query) {
  return GET('/api/flights/search', query)
    .then(raw => parseRawToEntity(raw))
    .then(result => {
      console.log(result);
      return result;
    });
}

export function parseRawToEntity (raw = {}) {
  return {
    query: raw.query,
    items: _.map(raw.items, item => Ticket.fromJson(item))
  }
}
