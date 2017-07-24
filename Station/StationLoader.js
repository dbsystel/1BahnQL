
const fetch = require('node-fetch');

const baseURL = 'https://api.deutschebahn.com';

class StationLoader {
  constructor(APIToken) {
    this.APIToken = APIToken;
  }

  get fetchConfiguration() {
    const headers = {
      Authorization: `Bearer ${this.APIToken}`,
    };
    const configuration = {
      method: 'GET',
      headers,
    };

    return configuration;
  }

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
      .then(res => res.json())
      .then((result) => {
        if (result && result.total > 0 && result.result) {
          return result.result[0];
        }
        return null;
      }, (error) => {
        console.error(error);
        switch (error.type) {
          case 'system': {
            throw new Error('Failed to load StaDa API Data');
          }
          case 'invalid-json': {
            throw new Error('Failed to parse StaDa API Data');
          }
          default: {
            throw new Error('Unknown Error');
          }
        }
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
      .then(res => res.json())
      .then((result) => {
        return (result.result || []);
      }, (error) => {
        console.error(error);
        switch (error.type) {
          case 'system': {
            throw new Error('Failed to load StaDa API Data');
          }
          case 'invalid-json': {
            throw new Error('Failed to parse StaDa API Data');
          }
          default: {
            throw new Error('Unknown Error');
          }
        }
      });

    return promies;
  }
}

module.exports = StationLoader;
