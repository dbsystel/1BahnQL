const parse = require('csv-parse');
const fs = require('fs');
const { stationNumbersByEvaIds } = require('./StationIdMappingService.js')
const { stationByBahnhofsnummer } = require('./StationService.js')

require.extensions['.csv'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var trainStations = require("./trainstations.csv");

function allStations(callback) {
	parse(trainStations, {comment: '#', delimiter: ";", columns: true}, callback);
}

function nearbyStations(latitude, longitude, count, callback) {
	allStations(function(err, stations) {
		var result = stations.sort(function(a, b){
			var distanceToA = calculateDistance(latitude * 1,longitude * 1,a.latitude * 1,a.longitude * 1)
			var distanceToB = calculateDistance(latitude * 1,longitude * 1,b.latitude * 1,b.longitude * 1)
			return distanceToA - distanceToB
		}).slice(0, count)

		callback(err, result)
	})
}

function stationNearby(latitude, longitude, count) {
	var promise = new Promise(function(resolve) {
		nearbyStations(latitude, longitude, count, function(err, stations) {
			resolve(stations)
		})
	}).then(function(stations) {
		let evaIDs = stations.map(station => station.id) 
		return stationNumbersByEvaIds(evaIDs)
	}).then(function(stationNrs) {
		return stationNrs.map(nr => stationByBahnhofsnummer(nr))
	})
	
	return promise
}

// http://stackoverflow.com/questions/26836146/how-to-sort-array-items-by-longitude-latitude-distance-in-javascripts
function calculateDistance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515

		// Miles to Kilometers
		dist = dist * 1.609344

        return dist
}
module.exports = { stationNearby };