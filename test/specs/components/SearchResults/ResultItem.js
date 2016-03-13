
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

import ticketType from '../../../../src/config/ticketTypes';
import { genTicket } from '../../../utils/gen';

describe('Search Result Item Component', () => {

  describe('render function', () => {

    it('should show airline logo, price, select button, and departure flight details', () => {
      const PROPS = genTicket('0', ticketType.ONEWAY);
      let wrapper = shallow(<ResultItem {...PROPS} />);
      expect(wrapper.contains(<Logo imageUri={PROPS.airline.logo.imageUri} />)).to.eql(true);
      expect(wrapper.contains(<FlightDetails {...PROPS.departureFlight} />)).to.eql(true);
      expect(wrapper.contains(<Price {...PROPS.price} />)).to.eql(true);
      expect(wrapper.contains(<SelectButton onSelect={wrapper.instance().onSelectHandler} />)).to.eql(true);
    });

    it('should show logo, price, select button, and the departure and the return flight details', () => {
      const PROPS = genTicket('0', ticketType.RETURN);
      let wrapper = shallow(<ResultItem {...PROPS} />);
      expect(wrapper.contains(<Logo imageUri={PROPS.airline.logo.imageUri} />)).to.eql(true);
      expect(wrapper.contains(<FlightDetails {...PROPS.departureFlight} />)).to.eql(true);
      expect(wrapper.contains(<FlightDetails {...PROPS.returnFlight} />)).to.eql(true);
      expect(wrapper.contains(<Price {...PROPS.price} />)).to.eql(true);
      expect(wrapper.contains(<SelectButton onSelect={wrapper.instance().onSelectHandler} />)).to.eql(true);
    });

    it('should have the search-result-item class', () => {
      const PROPS = genTicket('0', ticketType.RETURN);
      let wrapper = shallow(<ResultItem {...PROPS} />);
      expect(wrapper.hasClass('search-result-item')).to.eql(true);
    });
  });
});
