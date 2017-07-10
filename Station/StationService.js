const hafas = require('db-hafas')
const { stationNumberByEvaId } = require('./StationIdMappingService.js')

//Models
const Station = require('./Station.js')

class StationService {
	
	constructor(stationLoader) {
		this.stationLoader = stationLoader
	}

	stationByEvaId(evaID) {
		let stationLoader = this.stationLoader
		return stationNumberByEvaId(evaID).then(stationNumber => stationLoader.stationByBahnhofsnummer(stationNumber))
		.then(function(station) {
			if (station) {
				return new Station(station)
			} else {
				return null
			}
		})
	}

	stationByBahnhofsnummer(bahnhofsnummer) {
		return this.stationLoader.stationByBahnhofsnummer(bahnhofsnummer)
		.then(function(station) {
			if (station) {
				return new Station(station)
			} else {
				return null
			}
		})

		return new Station(promise);
	}

	searchStations(searchTerm) {
		return this.stationLoader.searchStations(searchTerm)
			.then(promises => promises.map(function(promise) {
				
				return promise.then(data => new Station(data))
			}))
	}
}

module.exports = StationService
