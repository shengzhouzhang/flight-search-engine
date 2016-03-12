
import { createStore } from 'redux';

export function reducer (previous = null, action) {
  switch (action.type) {
    case 'UPDATE':
      return action.results;
    default:
      return previous;
  }
}

export default createStore(reducer);
