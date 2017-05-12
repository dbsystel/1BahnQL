const fetch = require("node-fetch")
const Location = require("./location.js")

class Facility {
	constructor(description, type, state, location, equipmentnumber) {
		this.description = description
		this.type = type
		this.state = state
		this.location = location
		this.equipmentnumber = equipmentnumber
	}
}

var elevatorCache = {}
function loadElevatorFor(bahnhofsnumer) {
	var cached = elevatorCache[bahnhofsnumer]
	if (cached) {
		return cached
	}
	let url = "https://api.deutschebahn.com/fasta/v1/stations/" + (bahnhofsnumer)
	var myInit = { method: 'GET',
	headers: {"Authorization": "Bearer 56ea8e077d1a829c588a2af479863601"}};
	return fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		elevatorCache[bahnhofsnumer] = result.facilities
		return result.facilities.map(function(facility) {
			var location
			if (facility.geocoordY && facility.geocoordX) {
				location = new Location(facility.geocoordY, facility.geocoordX)
			}
			return new Facility(facility.description, facility.type,
				facility.state, location, facility.equipmentnumber)
		})
	})
}

module.exports = loadElevatorFor


