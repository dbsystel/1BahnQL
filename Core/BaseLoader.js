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
    } else if (resStatusCode == 400) {
      return apiErrorParser(APIName, res);
    } else if (resStatusCode == 404) {
      return apiErrorParser(APIName, res);
    } else if (resStatusCode == 500) {
      return apiErrorParser(APIName, res);
    } else {
      const errorMessage = `${res.status}: ${res.statusText} while requesting ${APIName}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

function apiErrorParser(api, res) {
  return res
    .json()
    .then(body => {
      const allErrors = body.errors;
      const firstError = allErrors[0];

      const errorMessage = `${res.status} at ${api}: ${firstError.name}: ${firstError
        .attributes
        .constraintElementName} ${firstError.message}, was ${firstError
        .attributes.constraintElementValue}`;
      console.error(errorMessage, res.url, body, allErrors);
      throw new Error(errorMessage);
    })
    .catch(error => {
      throw new Error(error);
    });
}

function between(x, min, max) {
  return x >= min && x <= max;
}

module.exports = BaseLoader;
