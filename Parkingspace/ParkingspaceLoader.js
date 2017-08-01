const fetch = require('node-fetch');

const serviceURL = '/bahnpark/v1';

class ParkingspaceLoader {
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

  spaceById(spaceId) {
    const url = `${this.baseURL}${serviceURL}/spaces/${spaceId}`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json())
  }

  occupancyForId(spaceId) {
    const url = `${this.baseURL}${serviceURL}/spaces/${spaceId}/occupancies`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json())
  }

  spacesForStationNumber(stationNumber) {
    const url = `${this.baseURL}${serviceURL}/spaces?limit=1000`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json())
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    const url = `${this.baseURL}${serviceURL}/spaces?limit=1000`;
    const configuration = this.fetchConfiguration;

    return fetch(url, configuration).then(res => res.json());
  }
}

module.exports = ParkingspaceLoader;
