const hafas = require('db-hafas')
const { stationNumberByEvaId } = require('./StationIdMappingService.js')

//Models
const Station = require('./Station.js')

class StationService {
	
	constructor(stationLoader) {
		this.stationLoader = stationLoader
	}
	
	transformStationResultIntoStation(jsonStation) {
		console.log(jsonStation)
		if (jsonStation) {
			return new Station(jsonStation)
		} else {
			return null
		}
	}

	stationByEvaId(evaID) {
		let stationLoader = this.stationLoader
		return stationNumberByEvaId(evaID).then(stationNumber => stationLoader.stationByBahnhofsnummer(stationNumber))
		.then(this.transformStationResultIntoStation)
	}

	stationByBahnhofsnummer(bahnhofsnummer) {
		return this.stationLoader.stationByBahnhofsnummer(bahnhofsnummer)
		.then(this.transformStationResultIntoStation)
	}

	searchStations(searchTerm) {
		return this.stationLoader.searchStations(searchTerm)
			.then(promises => promises.map(function(promise) {
				
				return promise.then(data => new Station(data))
			}))
	}
}

module.exports = StationService
