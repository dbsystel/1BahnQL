//Models
const Location = require('./location.js');
const MailAddress = require('./mailAddress');
const OpeningTimes = require('./openingTimes.js');
const RegionalArea = require('./RegionalArea.js')
const StationContact = require('./StationContact.js')

const loadElevatorFor = require('./facilities.js');
const { getParkingSpacesByBhfNr } = require('./ParkingSpaceQuery');
const { loadTimeTableFor } = require('./timetables.js');
const { stationNumberByEvaId } = require('./StationIdMappingService.js')

class Station {

  constructor(promise) {
    this.loadStation = promise;
  }

  get name() {
    return this.loadStation.then(station => station.name);
  }

  get location() {
    return this.loadStation.then((station) => {
      const coordinates = station.evaNumbers[0].geographicCoordinates.coordinates;
      return new Location(coordinates[1], coordinates[0]);
    });
  }

  get facilities() {
    return this.bahnhofsNummer.then(bahnhofsnummer => loadElevatorFor(bahnhofsnummer));
  }

  get category() {
    return this.loadStation.then(station => station.category);
  }

  get hasParking() {
    return this.loadStation.then(station => station.hasParking);
  }

  get hasBicycleParking() {
    return this.loadStation.then(station => station.hasBicycleParking);
  }

  get hasLocalPublicTransport() {
    return this.loadStation.then(station => station.hasLocalPublicTransport);
  }

  get hasPublicFacilities() {
    return this.loadStation.then(station => station.hasPublicFacilities);
  }

  get hasLockerSystem() {
    return this.loadStation.then(station => station.hasLockerSystem);
  }

  get hasTaxiRank() {
    return this.loadStation.then(station => station.hasTaxiRank);
  }

  get hasTravelNecessities() {
    return this.loadStation.then(station => station.hasTravelNecessities);
  }

  get hasSteplessAccess() {
    return this.loadStation.then(station => station.hasSteplessAccess);
  }

  get hasMobilityService() {
    return this.loadStation.then(station => station.hasMobilityService);
  }

  get federalState() {
    return this.loadStation.then(station => station.federalState);
  }

  get regionalArea() {
    return this.loadStation.then((station) => {
      const area = station.regionalbereich;
      return new RegionalArea(area.number, area.name, area.shortName);
    });
  }

  get mailingAddress() {
    return this.loadStation.then((station) => {
      const adress = station.mailingAddress;
      return new MailAddress(adress.city, adress.zipcode, adress.street);
    });
  }

  get aufgabentraeger() {
    return this.loadStation.then((station) => {
      const contact = station.aufgabentraeger;
			// ShortName & name switched -- see https://github.com/lightsprint09/DBOpenDataAPIBugs/issues/1
      return new StationContact(contact.shortName, contact.name,
				 contact.email, contact.number, contact.phoneNumber);
    });
  }

  get timeTableOffice() {
    return this.loadStation.then((station) => {
      const contact = station.timeTableOffice;
      return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.phoneNumber);
    });
  }

  get szentrale() {
    return this.loadStation.then((station) => {
      const contact = station.szentrale;
      return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.publicPhoneNumber);
    });
  }

  get stationManagement() {
    return this.loadStation.then((station) => {
      const contact = station.stationManagement;
      return new StationContact(contact.name, contact.shortName,
				 contact.email, contact.number, contact.phoneNumber);
    });
  }

  get DBInformationOpeningTimes() {
    return this.loadStation.then((station) => {
      if (!station.DBinformation) {
        return null;
      }
      return new OpeningTimes(station.DBinformation.availability);
    });
  }

  get localServiceStaffAvailability() {
    return this.loadStation.then((station) => {
      if (!station.localServiceStaff) {
        return null;
      }
      return new OpeningTimes(station.localServiceStaff.availability);
    });
  }

  get bahnhofsNummer() {
    return this.primaryEvaId.then(evaId => stationNumberByEvaId(evaId));
  }

  get primaryEvaId() {
    return this.loadStation.then(station => station.evaNumbers.filter(eva => eva.isMain)[0].number);
  }

  get primaryRil100() {
    return this.loadStation.then(station => station.ril100Identifiers.filter(ril => ril.isMain)[0].rilIdentifier);
  }

  get arrivalDepatureBoard() {
    return this.primaryEvaId.then(evaId => loadTimeTableFor(evaId));
  }

  get parkingSpaces() {
    return this.bahnhofsNummer.then(bhfNr => getParkingSpacesByBhfNr(bhfNr));
  }
}

module.exports = Station
