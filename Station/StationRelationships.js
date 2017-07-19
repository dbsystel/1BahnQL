const {
  getParkingSpacesByBhfNr,
} = require('../ParkingSpaceQuery');
const {
  loadTimeTableFor,
} = require('../timetables.js');


class StationRelationships {
  /**
	* A StationRelationships connects different datasources related to a station.
	* @constructor
	*/
  constructor(station, facilityService) {
    station.facilities = function () {
      return facilityService.facilitiesForStationNumber(station.stationNumber);
    };

    station.arrivalDepatureBoard = function () {
      return loadTimeTableFor(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return getParkingSpacesByBhfNr(station.stationNumber);
    };
  }
}

module.exports = StationRelationships;
