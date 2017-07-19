const access = require('safe-access');

const Location = require('../location');
const MailAddress = require('../mailAddress');

class Attributes {
  constructor(att) {
    this.licensePlate = att.licenseplate;
  }
}

class PriceOption {
  constructor(price) {
    this.interval = price.interval;
    this.type = price.type;
    this.grossamount = price.grossamount;
    this.currency = price.currency;
    this.taxrate = price.taxrate;
    this.preferredprice = price.preferredprice;
  }
}

class ParkingArea {
  constructor(parkingArea) {
    this.id = parkingArea.uid;
    this.url = parkingArea.href;
    this.name = parkingArea.name;
    this.address = new MailAddress(parkingArea.address.city, parkingArea.address.zip, `${parkingArea.address.street} ${parkingArea.address.number}`);
    this.address.district = parkingArea.address.district;
    this.address.isoCountryCode = parkingArea.address.isoCountryCode;
    this.parkingDescription = access(parkingArea, 'attributes.parking');
    this.accessDescription = access(parkingArea, 'attributes.access');
    this.locationDescription = access(parkingArea, 'attributes.locationnote');
    this.publicTransport = access(parkingArea, 'attributes.publictransportation');
    this.provider = new FlinksterAreaProvider(parkingArea.provider, parkingArea.providerAreaId, parkingArea.providerNetworkIds);
    this.type = parkingArea.type;
    if (parkingArea.geometry.position.type == 'Point') {
      this.position = new Location(parkingArea.geometry.position.coordinates[0], parkingArea.geometry.position.coordinates[1]);
    } else if (parkingArea.geometry.position.type == 'MultiPolygon') {
      // TODO: Handle MultiPolygon
    }
  }
}

class FlinksterAreaProvider {
  constructor(provider, areaId, networkIds) {
    this.url = provider.href;
    this.areaId = areaId;
    this.networkIds = networkIds;
  }
}

class FlinksterBike {
  constructor(bike) {
    this.id = bike.rentalObject.uid;
    this.url = bike.rentalObject.href;
    this.name = bike.rentalObject.name;
    this.description = bike.rentalObject.description;
    this.rentalModel = bike.rentalObject.rentalModel;
    this.providerRentalObjectId = bike.rentalObject.providerRentalObjectId;
    this.type = bike.rentalObject.type;
    this.attributes = new Attributes(bike.rentalObject.attributes);
    this.location = new Location(bike.position.coordinates[0], bike.position.coordinates[1]);
    this.address = new MailAddress(bike.area.address.city, bike.area.address.zip, bike.area.address.street);
    this.priceOptions = bike.price.items.map(price => new PriceOption(price));
    this.parkingArea = new ParkingArea(bike.area);
    this.bookingUrl = access(bike, '_links[0].href');
  }
}

module.exports = FlinksterBike;
