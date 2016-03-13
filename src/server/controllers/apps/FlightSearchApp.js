
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FlightSearchAppComponent from '../../../components/Apps/FlightSearchApp';
import routes from '../../../config/routes';

export default class FlightSearchApp {
  defaultRouter = express.Router();

  constructor() {
    this.defaultRouter.get(routes.SEARCH_TICKETS, this.app);
  };

  app = (req, res) => {
    let props = {};
    return res.render('index', {
      html: ReactDOMServer.renderToString(<FlightSearchAppComponent {...props} />),
      data: JSON.stringify(props)
    });
  };
};
