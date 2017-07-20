const loadElevatorFor = require('../facilities.js');

const {
  loadTimeTableFor,
} = require('../timetables.js');
const {
  stationNumberByEvaId,
} = require('./StationIdMappingService.js');

class StationRelationships {
  constructor(parkingSpaceService, trackService) {
    this.parkingSpaceService = parkingSpaceService;
    this.trackService = trackService;
  }

  resolve(station) {

    const parkingSpaceService = this.parkingSpaceService;
    const trackService = this.trackService;

    station.facilities = function () {
      return loadElevatorFor(station.stationNumber);
    };

    station.arrivalDepatureBoard = function () {
      return loadTimeTableFor(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };

    station.tracks = function() {
  	  return trackService.tracksForStationNumber(station.stationNumber)
    }
  }
}

module.exports = StationRelationships;
