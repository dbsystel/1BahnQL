const fetch = require('node-fetch');
const Parkingspace = require('./Parkingspace.js');

const baseURL = 'http://opendata.dbbahnpark.info/api/beta';

class ParkingspaceLoader {
  constructor(APIToken) {
    this.APIToken = APIToken;
  }

  get fetchConfiguration() {
    const headers = {};
    const configuration = {
      method: 'GET',
      headers,
    };

    return configuration;
  }

  spaceById(spaceId) {
    const url = `${baseURL}/sites`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          const filteredResult = result.results.filter(elem => elem.parkraumId == spaceId);

          if (filteredResult.length > 0) {
            return filteredResult[0];
          }
          return null;
        }
      });

    return promise;
  }

  occupancyForId(spaceId) {
    const url = `${baseURL}/occupancy/${spaceId}`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        console.log('Result');
        console.log(result);

        const occupancyData = result;

        if (occupancyData.code == 5101) {
          return null;
        }

        return occupancyData.allocation;
      });

    return promise;
  }

  evaIdForBhfNr(bahnhofNummer) {
    const url = `${baseURL}/stations`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        console.log(`Try to find ${bahnhofNummer}`);

        if (result.count > 0) {
          return result.results.filter(elem => elem.bahnhofsNummer == bahnhofNummer);
        }
      });

    return promise;
  }
}

module.exports = ParkingspaceLoader;
