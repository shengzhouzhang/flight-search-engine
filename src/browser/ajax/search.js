
import _ from 'lodash';
import { POST } from '../../browser/ajax/request';
import SearchResults from '../../domains/SearchResults';

export function search (query) {
  return POST('/api/flight-tickets/search', query)
    .then(raw => SearchResults.fromJson(raw))
    .then(result => {
      console.log(result);
      return result;
    });
}
