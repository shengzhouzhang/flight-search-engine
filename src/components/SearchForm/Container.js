
import React from 'react';
import TabButton from '../../components/SearchForm/TabButton';
import SearchForm from '../../components/SearchForm/SearchForm';
import ticketTypes from '../../config/ticketTypes';

export default class Container extends React.Component {
  state = {
    ticketType: ticketTypes.RETURN
  };
  render = () => {
    return (
      <div className="form-container">
        <div className="form-header">
          <TabButton name="one way" selected={this.isOneWaySelected()} onSelect={this.selectOneWay} />
          <TabButton name="return" selected={this.isReturnSelected()} onSelect={this.selectReturn} />
        </div>
        <div className="form-body">
          <SearchForm ticketType={this.state.ticketType} />
        </div>
      </div>
    );
  };
  isOneWaySelected = () => {
    return this.state.ticketType === ticketTypes.ONEWAY;
  };
  isReturnSelected = () => {
    return this.state.ticketType === ticketTypes.RETURN;
  };
  selectOneWay = () => {
    this.setState({ ticketType: ticketTypes.ONEWAY });
  };
  selectReturn = () => {
    this.setState({ ticketType: ticketTypes.RETURN });
  };
}
