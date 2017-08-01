const fetch = require("node-fetch");

const serviceURL = '';

class OperationLocationLoader {
  constructor(APIToken, baseURL) {
    this.APIToken = APIToken;
    this.baseURL = baseURL;
  }

  get fetchConfiguration() {
		let headers = {
			Authorization: 'Bearer ' + this.APIToken
		}
		let configuration = {
			method: 'GET',
			headers: headers
		}

		return configuration;
	}

  /**
	 * Search for bestriebsstellen with a given searchterm.
	 * @param {string} name - A term you want to search for.
	 * @return {Promise<Array<BetriebsstellenJSON>>}
	 */
	search(name) {
		const url = `${this.baseURL}${serviceURL}/betriebsstellen/v1/betriebsstellen?name=${name}`;
		const configuration = this.fetchConfiguration;
		const promies = fetch(url, configuration)
		.then(res => res.json())

		return promies;
	}
}

module.exports = OperationLocationLoader;
