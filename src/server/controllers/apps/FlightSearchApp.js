
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FlightSearchAppComponent from '../../../components/Apps/FlightSearchApp';

export default class FlightSearchApp {
  defaultRoute = (req, res) => {
    let props = {};
    return res.render('index', {
      html: ReactDOMServer.renderToString(<FlightSearchAppComponent {...props} />),
      data: JSON.stringify(props)
    });
  };
};
