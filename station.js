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
		return this.bahnhofsNummer.then(bahnhofsnummer => loadElevatorFor(bahnhofsnummer))
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
	
	get bahnhofsNummer() {
		return this.primaryRill100.then(function(ds100) {
			return getStationNumberFromDS100(ds100)
		})
	}
	
	get primaryEvaId() {
		return this.loadStation.then(function(station) {
			// console.log(station.evaNumbers, station.evaNumbers.filter((eva) => eva.isMain)[0].number)
			return station.evaNumbers.filter((eva) => eva.isMain)[0].number
		}) 
	}
	
	get primaryRill100() {
		return this.loadStation.then(function(station) {
			return station.ril100Identifiers.filter((rill) => rill.isMain)[0].rilIdentifier
		}) 
	}
}

function getStationNumberFrom(evaID) {
	return new Promise(function(resolve) {
		stations()
		.on('data', function(station) {
			if (station.id == evaID) {
				resolve(station.nr)
			}
		})
	})
}

function getStationNumberFromDS100(ds100) {
	return new Promise(function(resolve) {
		stations()
		.on('data', function(station) {
			if (station.ds100 == ds100) {
				resolve(station.nr)
			}
		})
	})
}

function loadStationEvaPromise(evaID) {
	getStationNumberFrom(evaID).then(function(stationNumber) {
		return loadStationPromise(stationNumber)
	}) 
	
	return fetch
}

function loadStationEva(evaID) {
	let fetch = loadStationEvaPromise(evaID)	
	return new Station(fetch)
}


function loadStationPromise(bahnhofsnumer) {
	let url = "https://api.deutschebahn.com/stada/v2/stations/" + bahnhofsnumer
	var myInit = { method: 'GET',
	               headers: {"Authorization": "Bearer 56ea8e077d1a829c588a2af479863601"}
			   };
	let promies = fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		let station = result.result[0]
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
				headers: {"Authorization": "Bearer 56ea8e077d1a829c588a2af479863601"}};
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
	headers: {"Authorization": "Bearer 56ea8e077d1a829c588a2af479863601"}};
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