
import request from '../../browser/ajax/request';

export function search (query) {
  console.log(query);
  return request('/api/tickets/search');
}
