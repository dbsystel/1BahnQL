const BaseLoader = require('./../Core/BaseLoader');

const baseURL = "https://api.deutschebahn.com";

class OperationLocationLoader extends BaseLoader {

  /**
	 * Search for bestriebsstellen with a given searchterm.
	 * @param {string} name - A term you want to search for.
	 * @return {Promise<Array<BetriebsstellenJSON>>}
	 */
	search(name) {
		const url = `${baseURL}/betriebsstellen/v1/betriebsstellen?name=${name}`;
		const configuration = this.fetchConfiguration;
		const promies = this.fetch(url, configuration)
		.then(res => FacilityLoader.parseJSON(res, "FaSta"))

		return promies;
	}
}

module.exports = OperationLocationLoader;
