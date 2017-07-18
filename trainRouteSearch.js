const hafas = require('db-hafas');
const TrainRoute = require('./trainRoute.js');

class TrainRouteSearch {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.promise = hafas.routes(this.from, this.to);
  }

  get options() {
    return this.promise.then(result => result.map(element => new TrainRoute(element)));
  }
}

module.exports = TrainRouteSearch;
