const access = require('safe-access');
const Location = require('./location');
const MailAddress = require('./mailAddress');

class FlinksterParkingArea {
  constructor(parkingArea) {
    this.id = parkingArea.uid;
    this.url = parkingArea.href;
    this.name = parkingArea.name;
    this.address = new MailAddress(parkingArea.address.city, parkingArea.address.zip, `${parkingArea.address.street} ${parkingArea.address.number}`);
    this.address.district = parkingArea.address.district;
    this.address.isoCountryCode = parkingArea.address.isoCountryCode;
    this.parkingDescription = access(parkingArea, 'attributes.parking');
    this.accessDescription = access(parkingArea, '.attributes.access');
    this.locationDescription = access(parkingArea, '.attributes.locationnote');
    this.publicTransport = access(parkingArea, '.attributes.publictransportation');
    this.provider = new FlinksterAreaProvider(parkingArea.provider, parkingArea.providerAreaId, parkingArea.providerNetworkIds);
    this.type = parkingArea.type;
  }
}

class FlinksterAreaProvider {
  constructor(provider, areaId, networkIds) {
    this.url = provider.href;
    this.areaId = areaId;
    this.networkIds = networkIds;
  }
}

module.exports = FlinksterParkingArea;