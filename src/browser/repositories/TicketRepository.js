
import _ from 'lodash';
import { POST } from '../../browser/repositories/requests';
import SearchResults from '../../domains/SearchResults';
import routes from '../../config/routes';

export default class TicketRepository {
  constructor (baseUri = '') {
    this.baseUri = baseUri;
  };
  search = (searchQuery) => {
    return POST(`${this.baseUri}${routes.API_PREFIX}${routes.SEARCH_TICKETS}`, searchQuery)
      .then(raw => SearchResults.fromJson(raw));
  };
}
