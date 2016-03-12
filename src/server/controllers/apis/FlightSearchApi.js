
import express from 'express';

export default class FlightSearchApp {
  defaultRouter = express.Router();

  constructor() {
    this.defaultRouter.get('/flights/search', this.search);
  };
  search = (req, res) => {
    let query = req.query;
    return res.status(200).json({ query: query, items: [] });
  };
};
