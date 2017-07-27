const fetch = require('node-fetch');

const baseURL = 'https://api.deutschebahn.com/bahnhofsfotos/v1';

class StationPictureLoader {
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
	 *
	 * @param {int} stationNumber - The stationNumber of the requested station pictures - aka Bahnhofsnummer in StaDa API.
	 * @return {Promise<Station>} promise of JSON station pictures.
	 */
  stationPictureForStationNumber(stationNumber) {
    if (!stationNumber) {
      return Promise.resolve(null);
    }
    const url = `http://api.railway-stations.org/de/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    const promise = fetch(url, configuration)
      .then(res => res.json());

    return promise;
  }

}

module.exports = StationPictureLoader
