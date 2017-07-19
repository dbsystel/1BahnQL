const {
  loadTimeTableFor,
} = require('../timetables.js');


class StationRelationships {
  /**
	* A StationRelationships connects different datasources related to a station.
	* @constructor
	*/
  constructor(parkingSpaceService, facilityService) {
    this.parkingSpaceService = parkingSpaceService
    this.facilityService = facilityService
  }

  resolve(station) {
    const parkingSpaceService = this.parkingSpaceService;
    const facilityService = this.facilityService;

    station.facilities = function () {
      return facilityService.facilitiesForStationNumber(station.stationNumber);
    };

    station.arrivalDepatureBoard = function () {
      return loadTimeTableFor(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };
  }
}

module.exports = StationRelationships;
