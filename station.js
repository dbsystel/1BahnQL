const stations = require('db-stations');
const fetch = require("node-fetch")

const Location = require("./location.js")
const MailAddress = require("./mailAddress")
const OpeningTimes = require("./openingTimes.js")

class RegionalArea {
	constructor(number, name, shortName) {
		this.number = number
		this.name = name
		this.shortName = shortName
	}
}

class StationContact {
	constructor(name, shortName, email, number, phoneNumber) {
		this.name = name
		this.shortName = shortName
		this.email = email
		this.number = number
		this.phoneNumber = phoneNumber
	}
}

class Station {
	
	constructor(promise) {
		this.loadStation = promise
	}
	
	get name() {
		return this.loadStation.then(station => station.name)
	}
	
	get location() {
		return this.loadStation.then(function(station) {
			var coordinates = station.evaNumbers[0].geographicCoordinates.coordinates
			return new Location(coordinates[1], coordinates[0])
		})
	}
	
	get facilities() {
		return this.bahnhofsnummer.then(bahnhofsnummer => loadElevatorFor(bahnhofsnummer))
	}
	
	get category() {
		return this.loadStation.then(station => station.category)
	}
	
	get hasParking() {
		return this.loadStation.then(station => station.hasParking)
	}
	
	get hasBicycleParking() {
		return this.loadStation.then(station => station.hasBicycleParking)
	}
	
	get hasLocalPublicTransport() {
		return this.loadStation.then(station => station.hasLocalPublicTransport)
	}
	
	get hasPublicFacilities() {
		return this.loadStation.then(station => station.hasPublicFacilities)
	}
	
	get hasLockerSystem() {
		return this.loadStation.then(station => station.hasLockerSystem)
	}
	
	get hasTaxiRank() {
		return this.loadStation.then(station => station.hasTaxiRank)
	}
	
	get hasTravelNecessities() {
		return this.loadStation.then(station => station.hasTravelNecessities)
	}
	
	get hasSteplessAccess() {
		return this.loadStation.then(station => station.hasSteplessAccess)
	}
	
	get hasMobilityService() {
		return this.loadStation.then(station => station.hasMobilityService)
	}
	
	get federalState() {
		return this.loadStation.then(station => station.federalState)
	}
	
	get regionalArea() {
		return this.loadStation.then(function(station) {
			var area = station.regionalbereich
			return new RegionalArea(area.number, area.name, area.shortName)
		})
	}
	
	get mailingAddress() {
		return this.loadStation.then(function(station) {
			var adress = station.mailingAddress
			return new MailAddress(adress.city, adress.zipcode, adress.street)
		})
	}
	
	get aufgabentraeger() {
		return this.loadStation.then(function(station) {
			var contact = station.aufgabentraeger
			//ShortName & name switched -- see https://github.com/lightsprint09/DBOpenDataAPIBugs/issues/1
			return new StationContact(contact.shortName, contact.name,
				 contact.email, contact.number, contact.phoneNumber)
		})
	}
	
	get timeTableOffice() {
		return this.loadStation.then(function(station) {
			var contact = station.timeTableOffice
			return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.phoneNumber)
		})
	}
	
	get szentrale() {
		return this.loadStation.then(function(station) {
			var contact = station.szentrale
			return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.publicPhoneNumber)
		})
	}
	
	get stationManagement() {
		return this.loadStation.then(function(station) {
			var contact = station.stationManagement
			return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.phoneNumber)
		})
	}
	
	get DBInformationOpeningTimes() {
		return this.loadStation.then(function(station) {
			if (!station.DBinformation) {
				return null
			}
			return new OpeningTimes(station.DBinformation.availability)
		}) 
	}
	
	get localServiceStaffAvailability() {
		return this.loadStation.then(function(station) {
			if (!station.localServiceStaff) {
				return null
			}
			return new OpeningTimes(station.localServiceStaff.availability)
		}) 
	}
	
	get bahnhofsnummer() {
		var evaId = this.evaId
		return new Promise(function(resolve) {
			stations()
			.on('data', function(station) {
				if (station.id == evaId) {
					resolve(station.nr)
				}
			})
		})
	}
}

function loadStationEvaPromise(evaID) {
	let fetch = new Promise(function(resolve) {
		stations()
		.on('data', function(station) {
			if (station.id == evaID) {
				resolve(station)
			}
		})
	}).then(function(station) {
		return loadStationPromise(station.nr)
	}) 
	
	return fetch
}

function loadStationEva(evaID) {
	let fetch = loadStationEvaPromise(evaID)	
	return new Station(fetch)
}

var stationCache = {}

function loadStationPromise(bahnhofsnumer) {
	let cache = stationCache[bahnhofsnumer]
	if (cache) {
		return new Promise((resolve) => resolve(cache))
	}
	let url = "https://api.deutschebahn.com/stada/v2/stations/" + bahnhofsnumer
	var myInit = { method: 'GET',
	               headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"}
			   };
	let promies = fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		let station = result.result[0]
		stationCache[bahnhofsnumer] = station
		return station
	})
	
	return promies
}

function loadStation(bahnhofsnumer) {
	let promies = loadStationPromise(bahnhofsnumer)
	return new Station(promies)
}

function searchStations(searchTerm) {
	let url = "https://api.deutschebahn.com/stada/v2/stations?searchstring=*" + searchTerm + "*"
	var myInit = { method: 'GET',
				headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"}};
	let promies = fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		return result.result.map(function(station) {
			return new Station(new Promise(function(resolve) {
				resolve(station)
			}))
		})
	})
	
	return promies 
}

//Move to elevator
var elevatorCache = {}
function loadElevatorFor(bahnhofsnumer) {
	var cached = elevatorCache[bahnhofsnumer]
	if (cached) {
		return cached
	}
	let url = "https://api.deutschebahn.com/fasta/v1/stations/" + (bahnhofsnumer)
	var myInit = { method: 'GET',
	headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"}};
	return fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		elevatorCache[bahnhofsnumer] = result.facilities
		return result.facilities
	})
}

module.exports = { Station, loadStationEva, searchStations};