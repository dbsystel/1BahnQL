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
        const occupancyData = result;

        if (occupancyData.code == 5101) {
          return null;
        }

        return occupancyData.allocation;
      });

    return promise;
  }

  // evaIdForStationNumber(stationNumber) {
  //   const url = `${baseURL}/stations`;
  //   const configuration = this.fetchConfiguration;

  //   const promise = fetch(url, configuration)
  //     .then(res => res.json())
  //     .then((result) => {
  //       console.log(`Try to find ${stationNumber}`);

  //       if (result.count > 0) {
  //         return result.results.filter(elem => elem.bahnhofsNummer == stationNumber);
  //       }
  //       return null;
  //     });

  //   return promise;
  // }

  spacesForStationNumber(stationNumber) {
    const url = `${baseURL}/sites`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.count > 0) {
          const filteredResult = result.results.filter(elem => elem.parkraumBahnhofNummer == stationNumber);

          if (filteredResult.length > 0) {
            return filteredResult;
          }
          return null;
        }
      });

    return promise;
  }
}

module.exports = ParkingspaceLoader;
