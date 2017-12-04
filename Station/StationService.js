// Models
const Station = require('./Station.js');

class StationService {
  /**
	* A Stations service provides capability of loading stations via IDs and text search.
	* @constructor
	*/
  constructor(stationLoader) {
    this.stationLoader = stationLoader;
    this.relationships;
  }

  transformStationResultIntoStation(jsonStation) {
    if (jsonStation) {
      const station = new Station(jsonStation);
      this.relationships.resolve(station);
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
    const self = this;
    return this.stationLoader
      .stationByEvaId(evaId)
      .then(station => self.transformStationResultIntoStation(station));
  }

  /**
	 * Request a Station with a given evaId.
	 * @param {int} evaId - The evaId of the requested station.
	 * @return {Promise<Station>} promise of a station - A promise which resolves to the fetched Station or null if the Id is not valid.
	 */
  stationByRil100(ril100) {
    const self = this;
    return this.stationLoader
      .stationByRil100(ril100)
      .then(station => self.transformStationResultIntoStation(station));
  }

  /**
	 * Request a Station with a given stationNumber(Station&Service calls them bahnhofsnummer in their APIs).
	 * @param {int} stationNumber - The stationNumber of the requested station.
	 * @return {Promise<Station>} promise of a station - A promise which resolves to the fetched Station or null if the Id is not valid.
	 */
  stationByBahnhofsnummer(stationNumber) {
    const self = this;
    return this.stationLoader
      .stationByBahnhofsnummer(stationNumber)
      .then(station => self.transformStationResultIntoStation(station));
  }

  /**
	 * Search for stations with a given searchterm. You can use * (arbitrary number of characters) and ? (one single character)
	 * @param {string} searchterm - A term you want to search for.
	 * @return {Promise<Array<Station>>} promise of a list station - A promise which resolves to the a list of matching stations.
	 */
  searchStations(searchTerm) {
    const self = this;
    return this.stationLoader
      .searchStations(searchTerm)
      .then(stations =>
        stations.map(station => self.transformStationResultIntoStation(station))
      );
  }
}

module.exports = StationService;
