const BaseLoader = require('./../Core/BaseLoader');

const baseURL = 'https://api.deutschebahn.com/bahnhofsfotos/v1';

class StationPictureLoader extends BaseLoader {

  /**
	 *
	 * @param {int} stationNumber - The stationNumber of the requested station pictures - aka Bahnhofsnummer in StaDa API.
	 * @return {Promise<Station>} promise of JSON station pictures.
	 */
  stationPictureForStationNumber(stationNumber) {
    const url = `http://api.railway-stations.org/de/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    const promise = this.fetch(url, configuration)
      .then(res => StationPictureLoader.parseJSON(res, "Bahnhofsfotos"));

    return promise;
  }

}

module.exports = StationPictureLoader
