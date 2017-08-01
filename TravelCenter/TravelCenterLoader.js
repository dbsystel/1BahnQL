const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/reisezentren/v1'

class TravelCenterLoader extends BaseLoader {

  travelCenterAtLocation(latitude, longitude) {
    const url = `${this.baseUrl}${serviceURL}/reisezentren/loc/${latitude}/${longitude}`;

    return this.fetch(url, this.fetchConfiguration)
      .then(res => TravelCenterLoader.parseJSON(res, "Reisezentren"))
  }
}

module.exports = TravelCenterLoader
