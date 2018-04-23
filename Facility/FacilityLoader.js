const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/fasta/v2';

class FacilityLoader extends BaseLoader {

  facilitiesForStationNumber(stationNumber) {
    const url = `${this.baseURL}${serviceURL}/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    return this.fetch(url, configuration)
      .then(res => FacilityLoader.parseJSON(res, "FaSta"))
      .then(result => result.facilities || []);
    }
}

module.exports = FacilityLoader
