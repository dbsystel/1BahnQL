class StationRelationships {

  /**
	* A StationRelationships connects different datasources related to a station.
	* @constructor
	*/
  constructor(parkingSpaceService, facilityService, timeTableService, trackService, stationPictureService) {
    this.parkingSpaceService = parkingSpaceService
    this.facilityService = facilityService
    this.timeTableService = timeTableService
    this.trackService = trackService;
    this.stationPictureService = stationPictureService
  }

  resolve(station) {
    const parkingSpaceService = this.parkingSpaceService;
    const facilityService = this.facilityService;
    const timeTableService = this.timeTableService;
    const trackService = this.trackService;
    const stationPictureService = this.stationPictureService;

    station.parkingSpaces = function () {
      return parkingSpaceService.parkingspacesForStationNumber(station.stationNumber);
    };

    station.facilities = function () {
      return facilityService.facilitiesForStationNumber(station.stationNumber);
    };

    station.timetable = function () {
      return timeTableService.timetableForEvaId(station.primaryEvaId);
    };

    station.tracks = function() {
  	  return trackService.tracksForStationNumber(station.stationNumber);
    }

    station.picture = () => {
      return stationPictureService.stationPictureForStationNumber(station.stationNumber);
    }

  }
}

module.exports = StationRelationships;
