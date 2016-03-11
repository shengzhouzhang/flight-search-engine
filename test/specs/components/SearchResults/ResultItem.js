
import React from 'react';
import moment from 'moment';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Logo from '../../../../src/components/SearchResults/Logo';
import FlightDetails from '../../../../src/components/SearchResults/FlightDetails';
import Price from '../../../../src/components/SearchResults/Price';
import SelectButton from '../../../../src/components/SearchResults/SelectButton';
import ResultItem from '../../../../src/components/SearchResults/ResultItem';

describe('Search Result Item Component', () => {

  it('should show airline logo, price, select button, and departure flight details', () => {
    const RESULT_ITEN_PROPS = {
      _id: 'TEST_ID',
      airline: { logoUri: 'LOGO_URI' },
      flight: {
        number: 'AI-202',
        from: 'PNQ',
        destination: 'DEL',
        depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
        arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
      },
      price: { symbol: '£', value: 125 },
      onSelect: sinon.spy()
    };
    let wrapper = shallow(<ResultItem {...RESULT_ITEN_PROPS} />);
    expect(wrapper.contains(<Logo imageUri={RESULT_ITEN_PROPS.airline.logoUri} />)).to.eql(true);
    expect(wrapper.contains(<FlightDetails {...RESULT_ITEN_PROPS.flight} />)).to.eql(true);
    expect(wrapper.contains(<Price {...RESULT_ITEN_PROPS.price} />)).to.eql(true);
    expect(wrapper.contains(<SelectButton onSelect={wrapper.instance().onSelectHandler} />)).to.eql(true);
  });

  it('should show logo, price, select button, and the departure and the return flight details', () => {
    const RESULT_ITEN_PROPS = {
      _id: 'TEST_ID',
      airline: { logoUri: 'LOGO_URI' },
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
    };
    let wrapper = shallow(<ResultItem {...RESULT_ITEN_PROPS} />);
    expect(wrapper.contains(<Logo imageUri={RESULT_ITEN_PROPS.airline.logoUri} />)).to.eql(true);
    expect(wrapper.contains(<FlightDetails {...RESULT_ITEN_PROPS.flight} />)).to.eql(true);
    expect(wrapper.contains(<FlightDetails {...RESULT_ITEN_PROPS.return} />)).to.eql(true);
    expect(wrapper.contains(<Price {...RESULT_ITEN_PROPS.price} />)).to.eql(true);
    expect(wrapper.contains(<SelectButton onSelect={wrapper.instance().onSelectHandler} />)).to.eql(true);
  });

  it('should have the search-result-item and one-way class name', () => {
    const RESULT_ITEN_PROPS = {
      _id: 'TEST_ID',
      airline: { logoUri: 'LOGO_URI' },
      flight: {
        number: 'AI-202',
        from: 'PNQ',
        destination: 'DEL',
        depart: moment('2014-01-01 10:00 AM', 'YYYY-MM-DD HH:mm A').valueOf(),
        arrive: moment('2014-01-01 12:00 PM', 'YYYY-MM-DD HH:mm A').valueOf(),
      },
      price: { symbol: '£', value: 125 },
      onSelect: sinon.spy()
    };
    let wrapper = shallow(<ResultItem {...RESULT_ITEN_PROPS} />);
    expect(wrapper.hasClass('search-result-item')).to.eql(true);
    expect(wrapper.hasClass('one-way')).to.eql(true);
  });

  it('should have the search-result-item and return class name', () => {
    const RESULT_ITEN_PROPS = {
      _id: 'TEST_ID',
      airline: { logoUri: 'LOGO_URI' },
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
    };
    let wrapper = shallow(<ResultItem {...RESULT_ITEN_PROPS} />);
    expect(wrapper.hasClass('search-result-item')).to.eql(true);
    expect(wrapper.hasClass('return')).to.eql(true);
  });

  it('should trigger onSelect handler and provide _id', () => {
    const RESULT_ITEN_PROPS = {
      _id: 'TEST_ID',
      airline: { logoUri: 'LOGO_URI' },
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
    };
    let wrapper = shallow(<ResultItem {...RESULT_ITEN_PROPS} />);
    expect(wrapper.contains(<SelectButton onSelect={wrapper.instance().onSelectHandler} />)).to.eql(true);
    wrapper.instance().onSelectHandler();
    expect(RESULT_ITEN_PROPS.onSelect.called).to.eql(true);
    expect(RESULT_ITEN_PROPS.onSelect.getCall(0).args[0]).to.eql(RESULT_ITEN_PROPS._id);
  });
});
