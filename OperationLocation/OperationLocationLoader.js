"use strict"
const fetch = require("node-fetch");
const baseURL = "https://api.deutschebahn.com";

class OperationLocationLoader {
  constructor(APIToken) {
    this.APIToken = APIToken;
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
		const url = `${baseURL}/betriebsstellen/v1/betriebsstellen?name=${name}`;
		const configuration = this.fetchConfiguration;
		const promies = fetch(url, configuration)
		.then(res => res.json())

		return promies;
	}
}

module.exports = OperationLocationLoader;
