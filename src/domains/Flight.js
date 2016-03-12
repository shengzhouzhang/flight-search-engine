

export default class Flight {
  constructor (_id, number, from, destination, departureTime, arrivalTime) {
    this._id = _id;
    this.number = number;
    this.from = from;
    this.destination = destination;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
  };
}
