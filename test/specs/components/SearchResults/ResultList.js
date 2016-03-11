
import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ResultItem from '../../../../src/components/SearchResults/ResultItem';
import ResultList from '../../../../src/components/SearchResults/ResultList';

describe('Result List Component', () => {

  it('should show a list of result items', () => {
    const RESULT_LIST_PROPS = {
      items:[
        {
          _id: 'TEST_ID_1',
          airline: { logoUri: 'LOGO_URI_1' },
          flight: {
            number: 'AI-202',
            from: 'PNQ',
            destination: 'DEL',
            depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
            arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
          },
          return: {
            number: 'AI-203',
            from: 'PNQ',
            destination: 'DEL',
            depart: moment('2014-01-10 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
            arrive: moment('2014-01-10 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
          },
          price: { symbol: '£', value: 125 },
          onSelect: sinon.spy()
        },
        {
          _id: 'TEST_ID_2',
          airline: { logoUri: 'LOGO_URI_2' },
          flight: {
            number: 'AI-202-2',
            from: 'PNQ_2',
            destination: 'DEL_2',
            depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
            arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
          },
          return: {
            number: 'AI-203-2',
            from: 'PNQ_2',
            destination: 'DEL_2',
            depart: moment('2014-01-10 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
            arrive: moment('2014-01-10 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
          },
          price: { symbol: '£', value: 125 },
          onSelect: sinon.spy()
        },
      ]
    };
    let wrapper = shallow(<ResultList {...RESULT_LIST_PROPS} />);
    expect(wrapper.find(ResultItem)).to.have.length(RESULT_LIST_PROPS.items.length);
    wrapper.find(ResultItem).forEach((Node, index) => {
      expect(Node.props()).to.eql(RESULT_LIST_PROPS.items[index]);
    });
  });

  it('should have result-list class', () => {
    const RESULT_LIST_PROPS = { items: [] };
    let wrapper = shallow(<ResultList {...RESULT_LIST_PROPS} />);
    expect(wrapper.hasClass('result-list')).to.eql(true);
  });
});
