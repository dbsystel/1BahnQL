const fetch = require('node-fetch');

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
      method: 'GET',
      headers
    };

    return configuration;
  }

  static parseJSON(res, APIName) {
    const resStatusCode = res.status;
    console.log(`STATUS CODE WAS: ${resStatusCode}`);
    return res.json().catch(error => {
      let errorMessage;
      switch (error.type) {
        case 'system': {
          errorMessage = `${APIName}: Failed to load data`;
          break;
        }
        case 'invalid-json': {
          errorMessage = `${APIName}: Failed to parse JSON`;
          break;
        }
        default: {
          errorMessage = `${APIName}: Unknown Error`;
          break;
        }
      }
      console.error(errorMessage);
      throw new Error(errorMessage, error);
    });
  }

  static between(x, min, max) {
    return x >= min && x <= max;
  }
}

// Works for Flinkster API
// function apiErrorParser(api, res) {
//   console.log(`Error for ${api}`);
//   return res
//     .json()
//     .then(body => {
//       switch (api) {
//         case 'Betriebsstellen': {
//           const error = body.error;
//           const errorMessage = `${res.status} at ${api}: ${error.message}`;
//           console.error(errorMessage, res.url, error);

//           throw new Error(error);
//           break;
//         }

//         case 'Flinkster': {
//           const allErrors = body.errors;
//           if (allErrors) {
//             error = allErrors[0];
//           }

//           const errorMessage = `${res.status} at ${api}: ${error.name}: ${error
//             .attributes.constraintElementName} ${error.message}, was ${error
//             .attributes.constraintElementValue}`;
//           console.error(errorMessage, res.url, body, allErrors);

//           throw new Error(errorMessage);
//           break;
//         }

//         default: {
//           const errorMessage = `${res.status} at ${api}: ${body.errMsg}`;
//           console.error(errorMessage, res.url, body);

//           throw new Error(errorMessage);
//           break;
//         }
//       }
//     })
//     .catch(error => {
//       throw new Error(error);
//     });
// }

module.exports = BaseLoader;
