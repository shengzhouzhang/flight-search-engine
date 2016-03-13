
import React from 'react';
import ReactDOM from 'react-dom';
import FlightSearchApp from '../components/Apps/FlightSearchApp';
import TicketRepository from '../browser/repositories/TicketRepository';

let ticketRepository = new TicketRepository();

function renderFlightSearchApp () {
  ReactDOM.render(
    <FlightSearchApp ticketRepository={ticketRepository} />,
    document.querySelector('.app-container')
  );
};

document.addEventListener("DOMContentLoaded", function(event) {
  renderFlightSearchApp();
});
