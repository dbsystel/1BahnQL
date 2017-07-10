'use strict';
const fetch = require("node-fetch")
const Parkingspace = require('./Parkingspace.js');
const baseURL = 'http://opendata.dbbahnpark.info/api/beta/sites'

class ParkingspaceLoader { 
  constructor(APIToken) {
    this.APIToken = APIToken
  }

  get fetchConfiguration() {
    let headers = {} 
    let configuration = {
      method: 'GET',
      headers: headers
    }
    
    return configuration
  }

  parkingspaceBySpaceId(spaceId) {
    const url = `${baseURL}/sites`;
    const configuration = this.fetchConfiguration

    const promise = fetch(url, configuration)
    .then(res => res.json())
    .then((result) => {
      if (result.count > 0) {
        const filteredResult = result.results.filter(elem => elem.parkraumId == spaceId);

        if (filteredResult.length > 0) {
          return filteredResult[0];
        } else {
          return null
        }
      }
    });

    return promise;
  }

  occupancyForParkingspace(spaceId) {

    const url = `${baseURL}/occupancy/${spaceId}`;
    const configuration = this.fetchConfiguration

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
}

module.exports = ParkingspaceLoader
