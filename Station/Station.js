const access = require('safe-access');

// Models
const Location = require('../Location.js');
const MailAddress = require('../mailAddress');
const OpeningTimes = require('../openingTimes.js');
const RegionalArea = require('./RegionalArea.js');
const StationContact = require('./StationContact.js');

class Station {
  constructor(station) {
    this.stationNumber = station.number;
    this.name = station.name;
    const coordinates = access(station, 'evaNumbers[0].geographicCoordinates.coordinates');
    if (coordinates) {
      this.location = new Location(coordinates[1], coordinates[0]);
    }
    this.category = station.category;
    this.hasParking = station.hasParking;
    this.hasTaxiRank = station.hasTaxiRank;
    this.hasBicycleParking = station.hasBicycleParking;
    this.hasLocalPublicTransport = station.hasLocalPublicTransport;
    this.hasPublicFacilities = station.hasPublicFacilities;
    this.hasLockerSystem = station.hasLockerSystem;
    this.hasTravelNecessities = station.hasTravelNecessities;
    this.hasSteplessAccess = station.hasSteplessAccess;
    this.hasMobilityService = station.hasMobilityService;
    this.federalState = station.federalState;

    const area = station.regionalbereich;
    if (area) {
        this.regionalArea = new RegionalArea(area.number, area.name, area.shortName);
    }

    const adress = station.mailingAddress;
    this.mailingAddress = new MailAddress(adress.city, adress.zipcode, adress.street);

    const contact = station.aufgabentraeger;
    if (contact) {
    this.aufgabentraeger = new StationContact(contact.name, contact.shortName,
      contact.email, contact.number, contact.phoneNumber);
    }

    const timeTableContact = station.timeTableOffice;
    if (timeTableContact) {
      this.timeTableOffice = new StationContact(timeTableContact.name, timeTableContact.shortName,
        timeTableContact.email, timeTableContact.number, timeTableContact.phoneNumber);
    }

    const szentraleContact = station.szentrale;
    if (szentraleContact) {
        this.szentrale = new StationContact(szentraleContact.name, szentraleContact.shortName,
      szentraleContact.email, szentraleContact.number, szentraleContact.publicPhoneNumber);
    }

    const stationManagementContact = station.stationManagement;
    if (stationManagementContact) {
        this.stationManagement = new StationContact(stationManagementContact.name, stationManagementContact.shortName,
      stationManagementContact.email, stationManagementContact.number, stationManagementContact.phoneNumber);
    }

    if (station.DBinformation) {
      this.DBInformationOpeningTimes = new OpeningTimes(station.DBinformation.availability);
    }

    if (station.localServiceStaff) {
      this.localServiceStaffAvailability = new OpeningTimes(station.localServiceStaff.availability);
    }
    this.primaryEvaId = access(station.evaNumbers.filter(eva => eva.isMain), '[0].number');
    let ril100Identifiers = (station.ril100Identifiers || []).filter(ril => ril.isMain)[0]
    this.primaryRil100 = access(ril100Identifiers, 'rilIdentifier');
    this.hasSteamPermission = access(ril100Identifiers, 'hasSteamPermission') || false;
    this.priceCategory = station.priceCategory;
    this.hasWiFi = station.hasWiFi;
    this.hasTravelCenter = station.hasTravelCenter;
    this.hasRailwayMission = station.hasRailwayMission;
    this.hasDBLounge = station.hasDBLounge;
    this.hasLostAndFound = station.hasLostAndFound;
    this.hasCarRental = station.hasCarRental;
  }
}

module.exports = Station;
