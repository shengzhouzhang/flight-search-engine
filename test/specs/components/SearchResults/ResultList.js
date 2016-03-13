
import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ResultItem from '../../../../src/components/SearchResults/ResultItem';
import ResultList from '../../../../src/components/SearchResults/ResultList';

import ticketTypes from '../../../../src/config/ticketTypes';
import { genTickets, genSearchQuery } from '../../../utils/gen';

describe('ResultList Component', () => {

  describe('render function', () => {

    it('should show a list of result items', () => {
      const PROPS = { items: genTickets(genSearchQuery(ticketTypes.RETURN), 10), filter: { min: 0, max: undefined } };
      let wrapper = shallow(<ResultList {...PROPS} />);
      expect(wrapper.find(ResultItem)).to.have.length(PROPS.items.length);
      wrapper.find(ResultItem).forEach((Node, index) => {
        expect(Node.props()).to.eql(PROPS.items[index]);
      });
    });

    it('should have result-list class', () => {
      const PROPS = { items: [], filter: { min: 0, max: undefined } };
      let wrapper = shallow(<ResultList {...PROPS} />);
      expect(wrapper.hasClass('result-list')).to.eql(true);
    });
  });
});
