
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FlightDetails from '../../../../src/components/SearchResults/FlightDetails';
import ResultItem, { OneWay, Return } from '../../../../src/components/SearchResults/ResultItem';

describe('Search Result Item Component', () => {

  it('should show the one way flight details', () => {
    const TEST_FLIGHT_DETAILS = {
      number: 'AI-202',
      from: 'PNQ',
      destination: 'DEL',
      depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    const TEST_PRICE = 125;
    const TEST_ON_SELECT_HANDLER = sinon.spy();
    let wrapper = shallow(<ResultItem flight={TEST_FLIGHT_DETAILS}
      price={TEST_PRICE} onSelect={TEST_ON_SELECT_HANDLER} />);
    expect(wrapper.contains(<OneWay flight={TEST_FLIGHT_DETAILS} />)).to.eql(true);
  });

  it('should show the return flight details', () => {
    const TEST_FLIGHT_DETAILS = {
      number: 'AI-202',
      from: 'PNQ',
      destination: 'DEL',
      depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    const TEST_RETURN_FLIGHT_DETAILS = {
      number: 'AI-203',
      from: 'PNQ',
      destination: 'DEL',
      depart: moment('2014-01-10 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
      arrive: moment('2014-01-10 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
    };
    const TEST_PRICE = 125;
    const TEST_ON_SELECT_HANDLER = sinon.spy();
    let wrapper = shallow(<ResultItem flight={TEST_FLIGHT_DETAILS} return={TEST_RETURN_FLIGHT_DETAILS}
      price={TEST_PRICE} onSelect={TEST_ON_SELECT_HANDLER} />);
    expect(wrapper.contains(<OneWay flight={TEST_FLIGHT_DETAILS} />)).to.eql(true);
    expect(wrapper.contains(<Return flight={TEST_RETURN_FLIGHT_DETAILS} />)).to.eql(true);
  });
});
