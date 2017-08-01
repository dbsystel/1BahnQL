const fetch = require('node-fetch');

const servicePath = '/bahnhofsfotos/v1';

class StationPictureLoader {
  constructor(APIToken, baseURL) {
    this.APIToken = APIToken;
    this.baseURL = baseURL;
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
    // const url = `${this.baseURL}${servicePath}/de/stations/${stationNumber}`;
    const url = `http://api.railway-stations.org/de/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    const promise = fetch(url, configuration)
      .then(res => res.json());

    return promise;
  }

}

module.exports = StationPictureLoader
