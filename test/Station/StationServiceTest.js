/* jslint node: true */
/* eslint-env mocha */

const chai = require('chai');
const StationService = require('../../Station/StationService.js')
const StationLoaderMock = require('./StationLoaderMock.js')
const StationIdMappingService = require('../../Station/StationIdMappingService.js')
const chaiAsPromised = require("chai-as-promised");
const StationRelationships = require("../../Station/StationRelationships");

chai.use(chaiAsPromised);
const expect = chai.expect;

const stationIdMappingService = new StationIdMappingService()

describe('StationService', () => {
  let stationLoaderMock = new StationLoaderMock()
  let stationService = new StationService(stationLoaderMock, stationIdMappingService)

  beforeEach(function() {
    stationLoaderMock = new StationLoaderMock()
    stationService = new StationService(stationLoaderMock)
    stationService.relationships =  { resolve: function(station) {} }
  });

  it('stationByEvaId should return valid station', () => {
    stationLoaderMock.result = require('./SingleStationMockResult')
    let promise = stationService.stationByEvaId(1)
    return Promise.all([
        expect(promise).to.eventually.have.property("primaryEvaId", 8000001),
        expect(promise).to.eventually.have.property("stationNumber", 1),
        expect(promise).to.eventually.have.property("primaryRil100", "KA"),
        expect(promise).to.eventually.have.property("name", "Aachen Hbf"),
        expect(promise).to.eventually.have.property("category", 2),
        expect(promise).to.eventually.have.property("hasParking", true),
        expect(promise).to.eventually.have.property("hasBicycleParking", true),
        expect(promise).to.eventually.have.property("hasLocalPublicTransport", true),
        expect(promise).to.eventually.have.property("hasPublicFacilities", true),
        expect(promise).to.eventually.have.property("hasLockerSystem", true),
        expect(promise).to.eventually.have.property("hasTaxiRank", true),
        expect(promise).to.eventually.have.property("hasTravelNecessities", true),
        expect(promise).to.eventually.have.property("hasSteplessAccess", "yes"),
        expect(promise).to.eventually.have.property("hasMobilityService", "Ja, um Voranmeldung unter 01806 512 512 wird gebeten"),
        expect(promise).to.eventually.have.property("hasSteamPermission", true),
        expect(promise).to.eventually.have.deep.property("location", {latitude: 6.091499, longitude: 50.7678}),
        expect(promise).to.eventually.have.deep.property("regionalArea", {name: "RB West", number: 4, shortName: "RB W" }),
        expect(promise).to.eventually.have.deep.property("mailingAddress", { city: "Aachen", zipcode: "52064", street: "Bahnhofplatz 2a" }),
        expect(promise).to.eventually.have.deep.property("regionalArea", { number: 4, name: "RB West", shortName: "RB W" }),
        // expect(promise).to.eventually.deep.include("DBInformationOpeningTimes", {}),
        // expect(promise).to.eventually.deep.include("localServiceStaffAvailability", {}),
         expect(promise).to.eventually.have.deep.property("aufgabentraeger", {shortName: "NVR", name: "Zweckverband Nahverkehr Rheinland GmbH", phoneNumber: undefined, number: undefined, email: undefined}),
         expect(promise).to.eventually.have.deep.property("szentrale", {shortName: undefined, name: "Duisburg Hbf", phoneNumber: "0203/30171055", number: 15, email: undefined}),
         expect(promise).to.eventually.have.deep.property("stationManagement", {shortName: undefined, name: "Düsseldorf", phoneNumber: undefined, number: 45, email: undefined})

    ]);
  });

  it('stationByEvaId should return null', () => {
    stationLoaderMock.result = null
    let promise = stationService.stationByEvaId(1)
    return expect(promise).to.eventually.become(null);
  })

  it('stationByBahnhofsnummer should return valid station', () => {
    stationLoaderMock.result = require('./SingleStationMockResult')
    let promise = stationService.stationByBahnhofsnummer(1)
    expect(stationLoaderMock.stationNumber).to.equal(1)
    return Promise.all([
        expect(promise).to.eventually.have.property("primaryEvaId", 8000001),
        expect(promise).to.eventually.have.property("stationNumber", 1),
        expect(promise).to.eventually.have.property("primaryRil100", "KA"),
        expect(promise).to.eventually.have.property("name", "Aachen Hbf"),
        expect(promise).to.eventually.have.property("category", 2),
        expect(promise).to.eventually.have.property("hasParking", true),
        expect(promise).to.eventually.have.property("hasBicycleParking", true),
        expect(promise).to.eventually.have.property("hasLocalPublicTransport", true),
        expect(promise).to.eventually.have.property("hasPublicFacilities", true),
        expect(promise).to.eventually.have.property("hasLockerSystem", true),
        expect(promise).to.eventually.have.property("hasTaxiRank", true),
        expect(promise).to.eventually.have.property("hasTravelNecessities", true),
        expect(promise).to.eventually.have.property("hasSteplessAccess", "yes"),
        expect(promise).to.eventually.have.property("hasMobilityService", "Ja, um Voranmeldung unter 01806 512 512 wird gebeten"),
        expect(promise).to.eventually.have.property("hasSteamPermission", true),
        expect(promise).to.eventually.have.deep.property("location", {latitude: 6.091499, longitude: 50.7678}),
        expect(promise).to.eventually.have.deep.property("regionalArea", {name: "RB West", number: 4, shortName: "RB W" }),
        expect(promise).to.eventually.have.deep.property("mailingAddress", { city: "Aachen", zipcode: "52064", street: "Bahnhofplatz 2a" }),
        expect(promise).to.eventually.have.deep.property("regionalArea", { number: 4, name: "RB West", shortName: "RB W" }),
        // expect(promise).to.eventually.deep.include("DBInformationOpeningTimes", {}),
        // expect(promise).to.eventually.deep.include("localServiceStaffAvailability", {}),
         expect(promise).to.eventually.have.deep.property("aufgabentraeger", {shortName: "NVR", name: "Zweckverband Nahverkehr Rheinland GmbH", phoneNumber: undefined, number: undefined, email: undefined}),
         expect(promise).to.eventually.have.deep.property("szentrale", {shortName: undefined, name: "Duisburg Hbf", phoneNumber: "0203/30171055", number: 15, email: undefined}),
         expect(promise).to.eventually.have.deep.property("stationManagement", {shortName: undefined, name: "Düsseldorf", phoneNumber: undefined, number: 45, email: undefined})

    ]);
  })

  it('stationByBahnhofsnummer should return null', () => {
    stationLoaderMock.result = null
    let promise = stationService.stationByBahnhofsnummer(1)
    return expect(promise).to.eventually.become(null);
  })

  it('searchStations should return array with a station', () => {
    stationLoaderMock.result = [require('./SingleStationMockResult')]
    let promise = stationService.searchStations("Aachen")
    expect(stationLoaderMock.searchTerm).to.equal("Aachen")
    promise = promise.then((stations) => stations[0])
    return Promise.all([
        expect(promise).to.eventually.have.property("primaryEvaId", 8000001),
        expect(promise).to.eventually.have.property("stationNumber", 1),
        expect(promise).to.eventually.have.property("primaryRil100", "KA"),
        expect(promise).to.eventually.have.property("name", "Aachen Hbf"),
        expect(promise).to.eventually.have.property("category", 2),
        expect(promise).to.eventually.have.property("hasParking", true),
        expect(promise).to.eventually.have.property("hasBicycleParking", true),
        expect(promise).to.eventually.have.property("hasLocalPublicTransport", true),
        expect(promise).to.eventually.have.property("hasPublicFacilities", true),
        expect(promise).to.eventually.have.property("hasLockerSystem", true),
        expect(promise).to.eventually.have.property("hasTaxiRank", true),
        expect(promise).to.eventually.have.property("hasTravelNecessities", true),
        expect(promise).to.eventually.have.property("hasSteplessAccess", "yes"),
        expect(promise).to.eventually.have.property("hasMobilityService", "Ja, um Voranmeldung unter 01806 512 512 wird gebeten"),
        expect(promise).to.eventually.have.property("hasSteamPermission", true),
        expect(promise).to.eventually.have.deep.property("location", {latitude: 6.091499, longitude: 50.7678}),
        expect(promise).to.eventually.have.deep.property("regionalArea", {name: "RB West", number: 4, shortName: "RB W" }),
        expect(promise).to.eventually.have.deep.property("mailingAddress", { city: "Aachen", zipcode: "52064", street: "Bahnhofplatz 2a" }),
        expect(promise).to.eventually.have.deep.property("regionalArea", { number: 4, name: "RB West", shortName: "RB W" }),
        // expect(promise).to.eventually.deep.include("DBInformationOpeningTimes", {}),
        // expect(promise).to.eventually.deep.include("localServiceStaffAvailability", {}),
         expect(promise).to.eventually.have.deep.property("aufgabentraeger", {shortName: "NVR", name: "Zweckverband Nahverkehr Rheinland GmbH", phoneNumber: undefined, number: undefined, email: undefined}),
         expect(promise).to.eventually.have.deep.property("szentrale", {shortName: undefined, name: "Duisburg Hbf", phoneNumber: "0203/30171055", number: 15, email: undefined}),
         expect(promise).to.eventually.have.deep.property("stationManagement", {shortName: undefined, name: "Düsseldorf", phoneNumber: undefined, number: 45, email: undefined})
    ]);
  })

});
