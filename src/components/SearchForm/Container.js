
import React from 'react';
import TabButton from '../../components/SearchForm/TabButton';
import { SearchFormOneWay, SearchFormReturn } from '../../components/SearchForm/SearchForm';
import ticketTypes from '../../config/ticketTypes';

export default class Container extends React.Component {
  static propTypes = {
    onSearch: React.PropTypes.func.isRequired
  }
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
          { this.renderSearchForm() }
        </div>
      </div>
    );
  };
  renderSearchForm = () => {
    switch (this.state.ticketType) {
      case ticketTypes.ONEWAY:
        return (<SearchFormOneWay onSearch={this.props.onSearch} />);
      case ticketTypes.RETURN:
        return (<SearchFormReturn onSearch={this.props.onSearch} />);
      default:
        throw new Error(`invalid ticket type: ${this.state.ticketType}`);
    }
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
