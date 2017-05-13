'use strict';

const loadParkingSpaceByGeo = require('./ParkingSpaceGeoQuery');
const loadNearbyTravelCenter = require('./TravelCenterGeoQuery');
const loadNearbyCars = require('./FlinksterGeoQuery');
const { stationNearby } = require('./station');

class NearbyQuery {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  get parkingSpaces() {
    return loadParkingSpaceByGeo(this.lat, this.lon);
  }

  get travelCenter() {
    return loadNearbyTravelCenter(this.lat, this.lon);
  }

  get flinksterCars() {
    return loadNearbyCars(this.lat, this.lon);
  }
  
  get stations() {
	  
  	return stationNearby(this.lat, this.lon)
  }
}

module.exports = NearbyQuery;
