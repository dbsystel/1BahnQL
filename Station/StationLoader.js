const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/stada/v2';

class StationLoader extends BaseLoader {
  /**
	 * Loads a singe station JSON from StaDa API.
	 * @param {int} stationNumber - The stationNumber of the requested station - aka Bahnhofsnummer in StaDa API.
	 * @return {Promise<Station>} promise of a JSON station
	 */
  stationByBahnhofsnummer(stationNumber) {
    if (!stationNumber) {
      return Promise.resolve(null);
    }
    const url = `${this.baseURL}${serviceURL}/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    const promise = this.fetch(url, configuration)
      .then(res => StationLoader.parseJSON(res, 'StaDa'))
      .then(result => {
        if (result && result.total) {
          return result.result[0];
        }
        return null;
      });

    return promise;
  }

  /**
	 * Loads a singe station JSON from StaDa API.
	 * @param {int} evaId - The evaId of the requested station
	 * @return {Promise<Station>} promise of a JSON station
	 */
  stationByEvaId(evaId) {
    const url = `${this.baseURL}${serviceURL}/stations?eva=${evaId}`;
    const configuration = this.fetchConfiguration;
    const promise = this.fetch(url, configuration)
      .then(res => StationLoader.parseJSON(res, 'StaDa'))
      .then(result => {
        if (result && result.total > 0 && result.result) {
          return result.result[0];
        }
        return null;
      });

    return promise;
  }

  /**
	 * Loads a singe station JSON from StaDa API.
	 * @param {String} evaId - The evaId of the requested station
	 * @return {Promise<Station>} promise of a JSON station
	 */
  stationByRil100(ril100) {
    const url = `${this.baseURL}${serviceURL}/stations?ril=${ril100}`;
    const configuration = this.fetchConfiguration;
    const promise = this.fetch(url, configuration)
      .then(res => StationLoader.parseJSON(res, 'StaDa'))
      .then(result => {
        if (result && result.total > 0 && result.result) {
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
    const url = `${this
      .baseURL}${serviceURL}/stations?searchstring=*${searchTerm}*`;
    const configuration = this.fetchConfiguration;
    let response;
    const promies = this.fetch(url, configuration)
      .then(res => {
        response = res;
        return StationLoader.parseJSON(res, 'StaDa');
      })
      .then(result => {
        if (StationLoader.between(response.status, 200, 399)) {
          return result.result || [];
        } else {
          const errorMessage = `${response.status} at StaDa: ${result.errMsg}`;
          console.error(errorMessage, response.url, result);

          throw new Error(errorMessage);
        }
      });

    return promies;
  }
}

module.exports = StationLoader;
