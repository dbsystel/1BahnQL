const loadElevatorFor = require('../facilities.js');
const {
  getParkingSpacesByBhfNr,
} = require('../ParkingSpaceQuery');
const {
  loadTimeTableFor,
} = require('../timetables.js');
const {
  stationNumberByEvaId,
} = require('./StationIdMappingService.js');

const TrackService = require('./../Platforms/TrackService.js');
const trackService = new TrackService()

class StationRelationships {
  constructor(station) {
    station.facilities = function () {
      return loadElevatorFor(station.stationNumber);
    };

    station.arrivalDepatureBoard = function () {
      return loadTimeTableFor(station.primaryEvaId);
    };

    station.parkingSpaces = function () {
      return getParkingSpacesByBhfNr(station.stationNumber);
    };

    station.tracks = function() {
  	  return trackService.tracksForStationNumber(station.stationNumber)
    }
  }
}

module.exports = StationRelationships;
