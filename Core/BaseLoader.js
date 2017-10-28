const fetch = require("node-fetch");

class BaseLoader {
  constructor(APIToken, baseURL) {
    this.APIToken = APIToken;
    this.fetch = fetch;
    this.baseURL = baseURL;
  }

  get fetchConfiguration() {
    const headers = {
      Authorization: `Bearer ${this.APIToken}`
    };
    const configuration = {
      method: "GET",
      headers
    };

    return configuration;
  }

  static parseJSON(res, APIName) {
    const resStatusCode = res.status;
    console.log(`STATUS CODE WAS: ${resStatusCode}`);
    if (between(resStatusCode, 200, 399)) {
      return res.json().catch(error => {
        let errorMessage;
        switch (error.type) {
          case "system": {
            errorMessage = `${APIName}: Failed to load data`;
            break;
          }
          case "invalid-json": {
            errorMessage = `${APIName}: Failed to parse JSON`;
            break;
          }
          default: {
            errorMessage = `${APIName}: Unknown Error`;
            break;
          }
        }
        console.error(errorMessage);
        throw new Error(errorMessage);
      });
    } else if (between(resStatusCode, 400, 499)) {
      const errorMessage = `${res.status}: ${res.statusText} while requesting ${res.url}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      const errorMessage = `${res.status}: ${res.statusText} while requesting ${res.url}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

function between(x, min, max) {
  return x >= min && x <= max;
}

module.exports = BaseLoader;
