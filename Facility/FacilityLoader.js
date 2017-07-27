const BaseLoader = require('./../Core/BaseLoader');

const baseURL = 'https://api.deutschebahn.com/fasta/v1';

class FacilityLoader extends BaseLoader {

  facilitiesForStationNumber(stationNumber) {
    const url = `${baseURL}/stations/${stationNumber}`;
    const configuration = this.fetchConfiguration;
    return this.fetch(url, configuration)
      .then(res => FacilityLoader.parseJSON(res, "FaSta"))
      .then(result => result.facilities || []);
    }
}

module.exports = FacilityLoader
