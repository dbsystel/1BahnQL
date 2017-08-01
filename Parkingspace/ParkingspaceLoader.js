const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/bahnpark/v1';

class ParkingspaceLoader extends BaseLoader {

  spaceById(spaceId) {
    const url = `${this.baseURL}${serviceURL}/spaces/${spaceId}`;
    const configuration = this.fetchConfiguration;

    return this.fetch(url, configuration).then(res => ParkingspaceLoader.parseJSON(res, "Bahnpark"))
  }

  occupancyForId(spaceId) {
    const url = `${this.baseURL}${serviceURL}/spaces/${spaceId}/occupancies`;
    const configuration = this.fetchConfiguration;

    return this.fetch(url, configuration).then(res => ParkingspaceLoader.parseJSON(res, "Bahnpark"))
  }

  spacesForStationNumber(stationNumber) {
    const url = `${this.baseURL}${serviceURL}/spaces?limit=1000`;
    const configuration = this.fetchConfiguration;

    return this.fetch(url, configuration).then(res => ParkingspaceLoader.parseJSON(res, "Bahnpark"))
  }

  nearbyParkingspaces(latitude, longitude, radius) {
    const url = `${this.baseURL}${serviceURL}/spaces?limit=1000`;
    const configuration = this.fetchConfiguration;

    return this.fetch(url, configuration).then(res => ParkingspaceLoader.parseJSON(res, "Bahnpark"));
  }
}

module.exports = ParkingspaceLoader;
