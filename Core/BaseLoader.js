const fetch = require('node-fetch');

class BaseLoader {

  constructor(APIToken, baseURL) {
    this.APIToken = APIToken;
    this.fetch = fetch
    this.baseURL = baseURL
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
      let errorMessage;
      switch (error.type) {

        case 'system': {
          errorMessage = `${APIName}: Failed to load data`;
        }
        case 'invalid-json': {
          errorMessage = `${APIName}: Failed to parse JSON`;
        }
        default: {
          errorMessage = `${APIName}: Unknown Error`;
        }
        console.warn(errorMessage, res);
        throw new Error(errorMessage);
      }
    })
  }
}

module.exports = BaseLoader
