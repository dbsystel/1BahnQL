const parse = require('csv-parse');
const fs = require('fs');
const Track = require('./Track.js');
require.extensions['.csv'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const tracksFile = require("./DBSuS-Bahnsteigdaten-Stand2017-04.csv");

class TrackService {

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

}

module.exports = TrackService
