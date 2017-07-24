const parse = require('csv-parse');
const fs = require('fs');
const Track = require('./Track.js');
require.extensions['.csv'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const tracksFile = require("./DBSuS-Bahnsteigdaten-Stand2017-04.csv");

class TrackService {

  constructor(stationMappingService) {
    this.stationMappingService = stationMappingService;
  }

  get tracks() {
      if (!this.tracksPromise) {
        this.tracksPromise = new Promise(function(resolve) {
    			parse(tracksFile, { comment: '#', delimiter: ";", columns: true}, function(err, result) {
    				let map = {}
    				result.forEach(function(track) {
    					let stationNumber = track["stationNumber"]
    					let tracks = map[stationNumber] || []
    					tracks.push(new Track(track))
    					map[stationNumber] = tracks
    				})
    				resolve(map)
    			});
    		})
      }
      return this.tracksPromise
  }

	tracksForStationNumber(stationNumber) {
		return this.tracks.then(tracks => tracks[stationNumber] || []);
	}

  trackAtStationEvaIdWithTrackNumberNumber(evaId, trackNumber) {
    const self = this;
    console.log(arguments);
    return this.stationMappingService.stationNumberByEvaId(evaId)
      .then(stationNumber => self.tracksForStationNumber(stationNumber))
      .then(tracks => tracks.filter(track => track.number == trackNumber)[0]);
  }

}

module.exports = TrackService
