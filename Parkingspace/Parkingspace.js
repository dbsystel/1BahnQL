const access = require('safe-access');

const Location = require('./../Location');
const MailAddress = require('./../mailAddress');

class Parkingspace {
  constructor(space) {
    this.id = space.id;
    this.name = space.title;
    this.label = space.label;
    this.spaceNumber = space.spaceNumber;
    this.responsibility = space.responsibility;
    this.source = space.source;
    this.nameDisplay = space.nameDisplay;
    this.spaceType = space.spaceType;
    this.spaceTypeEn = space.spaceTypeEn;
    this.spaceTypeName = space.spaceTypeName;
    this.location = new Location(access(space, 'geoLocation.latitude'), access(space, 'geoLocation.longitude'));
    this.url = space.url;
    this.operator = space.operator;
    this.operatorUrl = space.operatorUrl;
    this.address = new MailAddress(access(space, 'address.cityName'), access(space, 'address.postalCode'), access(space, 'address.street'));
    this.distance = space.distance;
    this.facilityType = space.facilityType;
    this.facilityTypeEn = space.facilityTypeEn;
    this.openingHours = space.openingHours;
    this.openingHoursEn = space.openingHoursEn;
    this.numberParkingPlaces = space.numberParkingPlaces;
    this.numberHandicapedPlaces = space.numberHandicapedPlaces;
    this.isSpecialProductDb = space.isSpecialProductDb;
    this.isOutOfService = space.isOutOfService;
    this.type = space.type;

    // space info
    this.clearanceWidth = access(space, 'spaceInfo.clearanceWidth');
    this.clearanceHeight = access(space, 'spaceInfo.clearanceHeight');
    this.allowedPropulsions = access(space, 'spaceInfo.allowedPropulsions');
    this.hasChargingStation = access(space, 'spaceInfo.chargingStation');

    // space flags
    this.spaceFlags = space.spaceFlags;

    // tariff info
    this.tariffDiscount = access(space, 'tariffInfo.tariffDiscount');
    this.tariffFreeParkingTime = access(space, 'tariffInfo.tariffFreeParkingTime');
    this.tariffPaymentOptions = access(space, 'tariffInfo.tariffPaymentOptions');
    this.tariffPaymentCustomerCards = access(space, 'tariffInfo.tariffPaymentCustomerCards');
    this.tariffDiscountEn = access(space, 'tariffInfo.tariffDiscountEn');
    this.tariffFreeParkingTimeEn = access(space, 'tariffInfo.tariffFreeParkingTimeEn');
    this.tariffPaymentOptionsEn = access(space, 'tariffInfo.tariffPaymentOptionsEn');

    // tariff flags
    this.isDiscountDbBahnCard = access(space, 'tariffFlags.isDiscountDbBahnCard');
    this.isDiscountDbBahnComfort = access(space, 'tariffFlags.isDiscountDbBahnComfort');
    this.isDiscountDbParkAndRail = access(space, 'tariffFlags.isDiscountDbParkAndRail');
    this.isDiscountDbBahnCard = access(space, 'tariffFlags.isMonthParkAndRide');
    this.isMonthSeason = access(space, 'tariffFlags.isMonthSeason');
    this.isMonthVendingMachine = access(space, 'tariffFlags.isMonthVendingMachine');
    this.isMonthParkAndRide = access(space, 'tariffFlags.isMonthParkAndRide');

    this.tariffPrices = space.tariffPrices;

    this.stationId = access(space, 'station.id');
    this.outOfServiceText = space.outOfServiceText;
    this.outOfServiceTextEn = space.outOfServiceTextEn;
    this.reservation = space.reservation;
    this.outOfService = space.isOutOfService;
    this.slogan = space.slogan;
    this.sloganEn = space.sloganEn;
  }
}

module.exports = Parkingspace;
