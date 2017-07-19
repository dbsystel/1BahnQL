const fetch = require('node-fetch');

const baseURL = 'https://api.deutschebahn.com/flinkster-api-ng/v1';

class FlinksterLoader {
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


  nearbyCars(latitude, longitude, radius, count, offset) {
    const url = `${baseURL}/bookingproposals?lat=${latitude}&lon=${longitude}&radius=${radius}&offset=${offset}&limit=${count}&providernetwork=1&expand=area%2Crentalobject%2Cprice`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.items) {
          return result.items;
        }
        return [];
      });

    return promise;
  }

  nearbyBikes(latitude, longitude, radius, count, offset) {
    const url = `${baseURL}/bookingproposals?lat=${latitude}&lon=${longitude}&radius=${radius}&offset=${offset}&limit=${count}&providernetwork=2&expand=area%2Crentalobject%2Cprice`;
    const configuration = this.fetchConfiguration;

    const promise = fetch(url, configuration)
      .then(res => res.json())
      .then((result) => {
        if (result.items) {
          return result.items;
        }
        return [];
      });

    return promise;
  }
}

module.exports = FlinksterLoader;
