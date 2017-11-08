const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/betriebsstellen/v1';

class OperationLocationLoader extends BaseLoader {
  /**
	 * Search for bestriebsstellen with a given searchterm.
	 * @param {string} name - A term you want to search for.
	 * @return {Promise<Array<BetriebsstellenJSON>>}
	 */
  search(name) {
    const url = `${this.baseURL}${serviceURL}/betriebsstellen?name=${name}`;
    const configuration = this.fetchConfiguration;
    const promies = this.fetch(url, configuration)
	  .then(res => OperationLocationLoader.parseJSON(res, 'betriebsstellen'))
	  .then(function(result) { 
		  if((!!result) && (result.constructor === Array)) {
			  return result
		  } else {
			  return []
		  }
	   });

    return promies;
  }
}

module.exports = OperationLocationLoader;
