'use strict';

const parkingGeoSearch = require('./ParkingSpaceGeoQuery');
const fetch = require('node-fetch');

class ParkingSpaceQuery {
  constructor(id) {
    this.id = id;
    this.promise = loadParkingSpaceById(id);
  }

  get parkingSpaces() {
    return parkingGeoSearch;
  }
}
