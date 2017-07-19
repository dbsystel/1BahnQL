const RoutePart = require('./routePart.js');

class Route {
  constructor(data) {
    this.data = data;
  }

  parts() {
    return this.data.parts.map(element => new RoutePart(element));
  }
}

module.exports = Route;
