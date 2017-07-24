const fetch = require('node-fetch');

const serviceUrl = '/reisezentren/v1'

class TravelCenterLoader {
  constructor(APIToken, baseURL) {
    this.APIToken = APIToken;
    this.baseURL = baseURL
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
    const url = `${this.baseUrl}${serviceURL}/reisezentren/loc/${latitude}/${longitude}`;

    return fetch(url, this.fetchConfiguration)
      .then(res => res.json())
  }
}

module.exports = TravelCenterLoader
