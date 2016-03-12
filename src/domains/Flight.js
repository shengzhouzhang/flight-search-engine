

export default class Flight {
  static fromJson = (raw = {}) => {
    return new Flight(
      raw._id,
      raw.number,
      raw.from,
      raw.destination,
      raw.departureTime,
      raw.arrivalTime
    );
  };
  constructor (_id, number, from, destination, departureTime, arrivalTime) {
    this._id = _id;
    this.number = number;
    this.from = from;
    this.destination = destination;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
  };
}
