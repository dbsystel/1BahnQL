const hafas = require('db-hafas')
const { stationNumberByEvaId } = require('./StationIdMappingService.js')

//Models
const Station = require('./Station.js')

function StationService(stationLoader) {

	function stationByEvaId(evaID) {
		const promise = stationNumberByEvaId(evaID).then(stationNumber => stationLoader.stationByBahnhofsnummer(stationNumber));
		return new Station(promise);
	}

	function stationByBahnhofsnummer(bahnhofsnummer) {
		const promise = stationLoader.stationByBahnhofsnummer(bahnhofsnummer)
		return new Station(promise);
	}

	function searchStations(searchTerm) {
		return stationLoader.searchStations(searchTerm)
			.then(promises => promises.map(promise => new Station(promise)))
	}

	return {
		searchStations,
		stationByEvaId,
		stationByBahnhofsnummer
	}
}

module.exports = StationService
