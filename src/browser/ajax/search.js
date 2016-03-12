
import request from '../../browser/ajax/request';

export function search (query) {
  return request('/api/tickets/search');
}
