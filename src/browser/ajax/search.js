
import _ from 'lodash';
import { POST } from '../../browser/ajax/request';
import SearchResults from '../../domains/SearchResults';
import routes from '../../config/routes';

export function search (query) {
  return POST(`${routes.API_BASE_URI}${routes.SEARCH_TICKETS}`, query)
    .then(raw => SearchResults.fromJson(raw))
    .then(result => {
      console.log(result);
      return result;
    });
}
