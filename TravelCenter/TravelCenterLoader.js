const BaseLoader = require('./../Core/BaseLoader');

const baseUrl = 'https://api.deutschebahn.com/reisezentren/v1'

class TravelCenterLoader extends BaseLoader {

  travelCenterAtLocation(latitude, longitude) {
    const url = `${baseUrl}/reisezentren/loc/${latitude}/${longitude}`;

    return this.fetch(url, this.fetchConfiguration)
      .then(res => TravelCenterLoader.parseJSON(res, "Reisezentren"))
  }
}

module.exports = TravelCenterLoader
