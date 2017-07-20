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


  nearbyFlinksters(type, latitude, longitude, radius, count, offset) {
    const url = `${baseURL}/bookingproposals?lat=${latitude}&lon=${longitude}&radius=${radius}&offset=${offset}&limit=${count}&providernetwork=${type}&expand=area%2Crentalobject%2Cprice`;
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
