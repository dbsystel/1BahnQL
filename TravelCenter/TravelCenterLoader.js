const fetch = require('node-fetch');

const baseUrl = 'https://api.deutschebahn.com/reisezentren/v1'

class TravelCenterLoader {
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
      'cache-control': 'force-cache'
    };

    return configuration;
  }

  travelCenterAtLocation(latitude, longitude) {
    const url = `${baseUrl}/reisezentren/loc/${latitude}/${longitude}`;

    return fetch(url, this.fetchConfiguration
      .then(res => res.json())
  }
}

module.exports = TravelCenterLoader
