const fetch = require('node-fetch');

class BaseLoader {

  constructor(APIToken) {
    this.APIToken = APIToken;
    this.fetch = fetch
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

  static parseJSON(res, APIName) {
    return res.json()
      .catch(error => {
      switch (error.type) {
        case 'system': {
          throw new Error(`${APIName}: Failed to load data`);
        }
        case 'invalid-json': {
          throw new Error(`${APIName}: Failed to parse JSON`);
        }
        default: {
          throw new Error('Unknown Error');
        }
      }
    })
  }
}

module.exports = BaseLoader
