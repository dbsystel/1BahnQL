class StationRelationships {

  /**
	* A StationRelationships connects different datasources related to a station.
	* @constructor
	*/
  constructor(parkingSpaceService, facilityService, timetableService, trackService) {
    this.parkingSpaceService = parkingSpaceService
    this.facilityService = facilityService
    this.timeTableService = timetableService
    this.trackService = trackService;
  }

  resolve(station) {
    const parkingSpaceService = this.parkingSpaceService;
    const facilityService = this.facilityService;
    const timetableService = this.timetableService;
    const trackService = this.trackService;

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };

    station.facilities = function () {
      return facilityService.facilitiesForStationNumber(station.stationNumber);
    };

    station.timetable = function () {
      return timetableService.timetableForEvaId(station.primaryEvaId);
    };

    station.tracks = function() {
  	  return trackService.tracksForStationNumber(station.stationNumber)
    }

  }
}

module.exports = StationRelationships;
