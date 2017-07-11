const hafas = require('db-hafas');
const { stationNumberByEvaId } = require('./StationIdMappingService.js');
const StationRelationships = require('./StationRelationships.js');

// Models
const Station = require('./Station.js');

class StationService {
  /**
	* A Stations service provides capability of loading stations via IDs, text search.
	* @constructor
	*/
  constructor(stationLoader) {
    this.stationLoader = stationLoader;
  }

  transformStationResultIntoStation(jsonStation) {
    if (jsonStation) {
      const station = new Station(jsonStation);
      new StationRelationships(station);

      return station;
    }
    return null;
  }

  /**
	 * Request a Station with a given evaId.
	 * @param {int} evaId - The evaId of the requested station.
	 * @return {Promise<Station>} promise of a station - A promise which resolves to the fetched Station or null if the Id is not valid.
	 */
  stationByEvaId(evaId) {
    const stationLoader = this.stationLoader;
    return stationNumberByEvaId(evaId).then(stationNumber => stationLoader.stationByBahnhofsnummer(stationNumber))
      .then(this.transformStationResultIntoStation);
  }

  /**
	 * Request a Station with a given stationNumber(Station&Service calls them bahnhofsnummer in their APIs).
	 * @param {int} stationNumber - The stationNumber of the requested station.
	 * @return {Promise<Station>} promise of a station - A promise which resolves to the fetched Station or null if the Id is not valid.
	 */
  stationByBahnhofsnummer(stationNumber) {
    return this.stationLoader.stationByBahnhofsnummer(stationNumber)
      .then(this.transformStationResultIntoStation);
  }

  /**
	 * Search for stations with a given searchterm. You can use * (arbitrary number of characters) and ? (one single character)
	 * @param {string} searchterm - A term you want to search for.
	 * @return {Promise<Array<Station>>} promise of a list station - A promise which resolves to the a list of matching stations.
	 */
  searchStations(searchTerm) {
    const self = this;
    return this.stationLoader.searchStations(searchTerm)
      .then(promises => promises.map(promise => promise.then(self.transformStationResultIntoStation)));
  }
}

module.exports = StationService;
