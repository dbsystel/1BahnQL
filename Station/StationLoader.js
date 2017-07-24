
const fetch = require('node-fetch');
const BaseLoader = require('./../Core/BaseLoader');

const baseURL = 'https://api.deutschebahn.com';


class StationLoader extends BaseLoader {

  /**
	 * Loads a singe station JSON from StaDa API.
	 * @param {int} stationNumber - The stationNumber of the requested station - aka Bahnhofsnummer in StaDa API.
	 * @return {Promise<Station>} promise of a JSO station
	 */
  stationByBahnhofsnummer(stationNumber) {
    if (!stationNumber) {
      return Promise.resolve(null);
    }
    const url = `${baseURL}/stada/v2/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    const promise = fetch(url, configuration)
      .then(res => StationLoader.parseJSON(res, "StaDa"))
      .then((result) => {
        if (result && result.total) {
          return result.result[0];
        }
        return null;
      });

    return promise;
  }

  /**
	 * Search for stations with a given searchterm. You can use * (arbitrary number of characters) and ? (one single character).
	 * @param {string} searchterm - A term you want to search for.
	 * @return {Promise<Array<StationJSON>>}
	 */
  searchStations(searchTerm) {
    const url = `${baseURL}/stada/v2/stations?searchstring=*${searchTerm}*`;
    const configuration = this.fetchConfiguration;
    const promies = fetch(url, configuration)
      .then(res => StationLoader.parseJSON(res, "StaDa"))
      .then((result) => {
        return (result.result || []);
      });

    return promies;
  }
}

module.exports = StationLoader;
