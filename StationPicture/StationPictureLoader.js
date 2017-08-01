const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/bahnhofsfotos/v1/';

class StationPictureLoader extends BaseLoader {

  /**
	 *
	 * @param {int} stationNumber - The stationNumber of the requested station pictures - aka Bahnhofsnummer in StaDa API.
	 * @return {Promise<Station>} promise of JSON station pictures.
	 */
  stationPictureForStationNumber(stationNumber) {
    if (!stationNumber) {
      return Promise.resolve(null);
    }
    const url = `${this.baseURL}${serviceURL}/de/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    const promise = this.fetch(url, configuration)
      .then(res => StationPictureLoader.parseJSON(res, "Bahnhofsfotos"));

    return promise;
  }

}

module.exports = StationPictureLoader
