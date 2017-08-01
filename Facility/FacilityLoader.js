const fetch = require('node-fetch');

const serviceURL = '/fasta/v1';

class FacilityLoader {
  constructor(APIToken, baseURL) {
    this.APIToken = APIToken
    this.baseURL = baseURL;
  }

  facilitiesForStationNumber(stationNumber) {
    const url = `${this.baseURL}${serviceURL}/stations/${stationNumber}`;
    const myInit = { method: 'GET',
      headers: { Authorization: `Bearer ${this.APIToken}` } };
    return fetch(url, myInit)
      .then(res => res.json())
      .then(result => result.facilities || []);
    }
}

module.exports = FacilityLoader
