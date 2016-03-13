
import { createStore } from 'redux';

export function reducer (previous = { min: 0, max: undefined }, action) {
  switch (action.type) {
    case 'UPDATE':
      return action.filter;
    default:
      return previous;
  }
}

export default createStore(reducer);
