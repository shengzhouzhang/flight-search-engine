
import { expect } from 'chai';
import ticketTypes from '../../../src/config/ticketTypes';
import SearchResults from '../../../src/domains/SearchResults';
import { genSearchResults } from '../../utils/gen';

describe('SearchResults Domain', () => {

  describe('constructor', () => {

    it('should set searchQuery and tickets', () => {
      const RESULT = genSearchResults(ticketTypes.ONEWAY, 3);
      expect(new SearchResults(RESULT.searchQuery, RESULT.tickets)).to.eql(RESULT);
    });
  });

  describe('fromJson function', () => {

    it('should construct an object from Json', () => {
      const RESULT = genSearchResults(ticketTypes.ONEWAY, 3);
      expect(SearchResults.fromJson(RESULT)).to.eql(new SearchResults(RESULT.searchQuery, RESULT.tickets));
    });
  });
});
