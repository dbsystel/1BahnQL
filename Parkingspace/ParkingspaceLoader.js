const fetch = require('node-fetch');

const baseURL = 'https://api.deutschebahn.com/bahnpark/v1';

class ParkingspaceLoader {
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

  spaceById(spaceId) {
    const url = `${baseURL}/spaces/${spaceId}`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json())
  }

  occupancyForId(spaceId) {
    const url = `${baseURL}/spaces/${spaceId}/occupancies`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json())
  }

  spacesForStationNumber(stationNumber) {
    const url = `${baseURL}/spaces?limit=1000`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json())
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    const url = `${baseURL}/spaces?limit=100`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json());
  }
}

module.exports = ParkingspaceLoader;
