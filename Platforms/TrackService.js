const parse = require('csv-parse');
const fs = require('fs');
const Track = require('./Track.js');
require.extensions['.csv'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const tracksFile = require("./DBSuS-Bahnsteigdaten-Stand2017-04.csv");

class TrackService {
	
	constructor() {
		console.log("construct it")
		this.tracks = new Promise(function(resolve) {
			parse(tracksFile, {comment: '#', delimiter: ";", columns: true}, function(err, result) {
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
	
	tracksForStationNumber(stationNumber) {
		return this.tracks.then(tracks => tracks[stationNumber])
/*
		return this.tracks.then(tracks => tracks.filter(track => track["stationNumber"] == stationNumber))
		.then(tracks => tracks.map(track => new Track(track)))
*/
	}
	
	tracksForStationNumberWithTrackName(trackName) {}
}

module.exports = TrackService