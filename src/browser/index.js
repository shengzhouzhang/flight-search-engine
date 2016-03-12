
import React from 'react';
import ReactDOM from 'react-dom';
import FlightSearchApp from '../components/Apps/FlightSearchApp';

function renderFlightSearchApp () {
  ReactDOM.render(
    <FlightSearchApp />,
    document.querySelector('.app-container')
  );
};

document.addEventListener("DOMContentLoaded", function(event) {
  renderFlightSearchApp();
});
