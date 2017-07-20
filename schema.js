const { buildSchema } = require('graphql');
const experimental = process.env.experimental

const experimentalTypes = experimental ? `
type Route {
  parts: [RoutePart!]!
  from: Station
  to: Station
}

type RoutePart {
  # Station where the part begins
  from: Station!
  to: Station!
  delay: Int
  product: Product!
  direction: String!
  start: String!
  end: String!
}

type Product {
  name: String
  class: Int
  productCode: Int
  productName: String
}
` : ''

const experimentalQuerys = experimental ? `
  routing(from: Int!, to: Int!): [Route!]!
` : ''

const schema = buildSchema(`
  type Query {
    ${experimentalQuerys}
    stationWith(evaId: Int): Station
    search(searchTerm: String): Searchable!
    nearby(latitude: Float!, longitude: Float!, radius: Int = 10000): Nearby!
    parkingSpace(id: Int): ParkingSpace
  }

  ${experimentalTypes}

  type Searchable {
	  stations: [Station!]!
    operationLocations: [OperationLocation!]!
  }

  type OperationLocation {
    id: String
    abbrev: String!
    name: String!
    shortName: String!
    type: String!
    status: String
    locationCode: String
    UIC: String!
    regionId: String
    validFrom: String!
    validTill: String
    timeTableRelevant: Boolean
    borderStation: Boolean
  }
  type Station {
	  primaryEvaId: Int!
	  stationNumber: Int!
	  primaryRil100: String!
	  name: String!
	  location: Location!
	  category: Int!
    priceCategory: Int!
	  hasParking: Boolean!
	  hasBicycleParking: Boolean!
	  hasLocalPublicTransport: Boolean!
	  hasPublicFacilities: Boolean!
	  hasLockerSystem: Boolean!
	  hasTaxiRank: Boolean!
	  hasTravelNecessities: Boolean!
	  hasSteplessAccess: String!
	  hasMobilityService: String!
	  federalState: String!
	  regionalArea: RegionalArea!
	  facilities: [Facility!]!
	  mailingAddress: MailingAddress!
	  DBInformationOpeningTimes: OpeningTimes
	  localServiceStaffAvailability: OpeningTimes
	  aufgabentraeger: StationContact!
	  timeTableOffice: StationContact!
	  szentrale: StationContact!
	  stationManagement: StationContact!
	  timetable: Timetable!
    parkingSpaces: [ParkingSpace!]!
    hasSteamPermission: Boolean!
    hasWiFi: Boolean!
    hasTravelCenter: Boolean!
    hasRailwayMission: Boolean!
    hasDBLounge: Boolean!
    hasLostAndFound: Boolean!
    hasCarRental: Boolean!
  }

  type Location {
	  latitude: Float!
	  longitude: Float!
  }

  type Facility {
	  description: String
	  type: FacilityType!
	  state: FacilityState!
	  equipmentNumber: Int
	  location: Location
  }

  enum FacilityState {
    ACTIVE
    INACTIVE
  }

  enum FacilityType {
    ESCALATOR
    ELEVATOR
  }

  type MailingAddress {
	  city: String!
	  zipcode: String!
	  street: String!
  }

  type RegionalArea {
	  number: Int!
	  name: String!
	  shortName: String!
  }

  type OpeningTimes {
	  monday: OpeningTime
	  tuesday: OpeningTime
	  wednesday: OpeningTime
	  thursday: OpeningTime
	  friday: OpeningTime
	  saturday: OpeningTime
	  sunday: OpeningTime
	  holiday: OpeningTime
  }

  type OpeningTime {
	  from: String!
	  to: String!
  }

  type StationContact {
	  name: String!
	  shortName: String
	  email: String
	  number: String
	  phoneNumber: String
  }

  type Nearby {
    stations (count: Int = 10, offset: Int = 0): [Station!]!
    parkingSpaces (count: Int = 10, offset: Int = 0): [ParkingSpace!]!
    travelCenters (count: Int = 10, offset: Int = 0): [TravelCenter!]!
    flinksterCars (count: Int = 10, offset: Int = 0): [FlinksterCar!]!
    bikes (count: Int = 10, offset: Int = 0): [FlinksterBike!]!
  }

  type ParkingSpace {
    id: Int!
    name: String!
    station: Station
    lots: Int!
    location: Location!
    occupancy: Occupancy
    bundesland: String!
    isPublished: Boolean!
    parkraumAusserBetriebText: String
    parkraumAusserBetrieb_en: String
    parkraumBahnhofName: String
    parkraumBahnhofNummer: Int
    parkraumBemerkung: String
    parkraumBemerkung_en: String
    parkraumBetreiber: String
    parkraumDisplayName: String
    parkraumEntfernung: String
    parkraumId: String!
    parkraumIsAusserBetrieb: Boolean!
    parkraumIsDbBahnPark: Boolean!
    parkraumIsOpenData:  Boolean!
    parkraumIsParktagesproduktDbFern: Boolean!
    parkraumKennung: String
    parkraumName: String!
    parkraumOeffnungszeiten: String
    parkraumOeffnungszeiten_en: String
    parkraumParkTypName: String
    parkraumParkart: String
    parkraumParkart_en: String
    parkraumReservierung: String
    parkraumStellplaetze: String
    parkraumTechnik: String
    parkraumTechnik_en: String
    parkraumZufahrt: String
    parkraumZufahrt_en: String
    tarif1MonatAutomat: String
    tarif1MonatDauerparken: String
    tarif1MonatDauerparkenFesterStellplatz: String
    tarif1Std: String
    tarif1Tag: String
    tarif1Woche: String
    tarif30Min: String
    tarifFreiparkzeit: String
    tarifFreiparkzeit_en: String
    tarifMonatIsDauerparken: Boolean
    tarifMonatIsParkAndRide: Boolean
    tarifMonatIsParkscheinautomat: Boolean
    tarifParkdauer: String
    tarifParkdauer_en: String
    tarifRabattDBIsBahnCard: Boolean
    tarifRabattDBIsParkAndRail: Boolean
    tarifRabattDBIsbahncomfort: Boolean
    tarifSondertarif: String
    tarifSondertarif_en: String
    tarifWieRabattDB: String
    tarifWieRabattDB_en: String
    tarifWoVorverkaufDB: String
    tarifWoVorverkaufDB_en: String
    zahlungMedien: String
    zahlungMedien_en: String
  }

  type Occupancy {
    validData: Boolean!
    timestamp: String!
    timeSegment: String!
    category: Int!
    text: String!
  }

  type Timetable {
	  nextArrivals: [TrainInStation!]!
	  nextDepatures: [TrainInStation!]!
  }

  type TrainInStation {
	  type: String!
	  trainNumber: String!
	  platform: String!
	  time: String!
	  stops: [String!]!
  }

  type TravelCenter {
    id: Int
    name: String
    address: MailingAddress
    type: String
	  location: Location
  }

  type FlinksterCar {
    id: String!
    name: String!
    description: String!
    attributes: CarAttributes!
    location: Location!
    priceOptions: [PriceOption]!
    equipment: CarEquipment!
    rentalModel: String!
    parkingArea: FlinksterParkingArea!
    category: String!
    url: String!
  }

  type FlinksterBike {
    id: String!
    url: String!
    name: String!
    description: String!
    location: Location!
    priceOptions: [PriceOption]!
    attributes: BikeAttributes!
    address: MailingAddress!
    rentalModel: String!
    type: String!
    providerRentalObjectId: Int!
    parkingArea: FlinksterParkingArea!
    bookingUrl: String!
  }

  type CarAttributes {
    seats: Int!
    color: String!
    doors: Int!
    transmissionType: String!
    licensePlate: String
    fillLevel: Int
    fuel: String
  }

  type CarEquipment {
    cdPlayer: Boolean
    airConditioning: Boolean
    navigationSystem: Boolean
    roofRailing: Boolean
    particulateFilter: Boolean
    audioInline: Boolean
    tyreType: String
    bluetoothHandsFreeCalling: Boolean
    cruiseControl: Boolean
    passengerAirbagTurnOff: Boolean
    isofixSeatFittings: Boolean
  }

  type FlinksterParkingArea {
    id: String!
    url: String!
    name: String!
    address: MailingAddress!
    parkingDescription: String
    accessDescription: String
    locationDescription: String
    publicTransport: String
    provider: FlinksterProvider!
    type: String!
    position: Location!
    GeoJSON: GeoJSON
  }

  type GeoJSON {
    type: String!
    features: [GeoFeature!]!
  }

  type GeoFeature {
    type: String!
    properties: GeoProperties!
    geometry: GeoPolygon!
  }

  type GeoPolygon {
    type: String!
    coordinates: [[[[Float!]!]!]!]!
  }

  type GeoProperties {
    name: String!
  }

  type FlinksterProvider {
    url: String!
    areaId: Int!
    networkIds: [Int!]!
  }

  type BikeAttributes {
    licensePlate: String!
  }

  type PriceOption {
    interval: Int
    type: String!
    grossamount: Float!
    currency: String!
    taxrate: Float!
    preferredprice: Boolean!
  }
`);

module.exports = schema;
