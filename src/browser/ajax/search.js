
import { GET } from '../../browser/ajax/request';

export function search (query) {
  return GET('/api/tickets/search', query);
}
