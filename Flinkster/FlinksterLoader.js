const BaseLoader = require('./../Core/BaseLoader');

const serviceURL = '/flinkster-api-ng/v1';

class FlinksterLoader extends BaseLoader {
  nearbyFlinksters(type, latitude, longitude, radius, count, offset) {
    const url = `${this.baseURL}${serviceURL}/bookingproposals?lat=${latitude}&lon=${longitude}&radius=${radius}&offset=${offset}&limit=${count}&providernetwork=${type}&expand=area%2Crentalobject%2Cprice`;
    const configuration = this.fetchConfiguration;

    return this.fetch(url, configuration).then(res => FlinksterLoader.parseJSON(res, "Flinkster"));
  }
}

module.exports = FlinksterLoader;
