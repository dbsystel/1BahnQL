const fetch = require('node-fetch');

const baseURL = 'https://api.deutschebahn.com/fasta/v1';

class FacilityLoader {
  constructor(APIToken) {
    this.APIToken = APIToken
  }

  facilitiesForStationNumber(stationNumber) {
    const url = `${baseURL}/stations/${stationNumber}`;
    const myInit = { method: 'GET',
      headers: { Authorization: `Bearer ${this.APIToken}` } };
    return fetch(url, myInit)
      .then(res => res.json())
      .then(result => result.facilities || []);
    }
}

module.exports = FacilityLoader
