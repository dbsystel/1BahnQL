const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    routeSearch(from: Int, to: Int): [Route]
    stationWith(evaId: Int): Station 
    search(searchTerm: String): Searchable
    nearby(lat: Float, lon: Float): Nearby
    parkingSpace(id: Int): ParkingSpace
  }
  
  type Searchable {
	  stations: [Station]
  }
  
  type Route {
	  parts: [RoutePart]
  }
  
  type RoutePart {
	  # Station where the part begins
	  from: Station
	  to: Station
	  delay: Int
	  product: Product
	  direction: String
	  start: String
	  end: String
  }
  type Station {
	  primaryEvaId: Int
	  bahnhofsNummer: Int
	  primaryRil100: String
	  name: String
	  location: Location
	  category: Int
	  hasParking: Boolean
	  hasBicycleParking: Boolean
	  hasLocalPublicTransport: Boolean
	  hasPublicFacilities: Boolean
	  hasLockerSystem: Boolean
	  hasTaxiRank: Boolean
	  hasTravelNecessities: Boolean
	  hasSteplessAccess: String
	  hasMobilityService: String
	  federalState: String
	  regionalArea: RegionalArea
	  id: Int
	  facilities: [Facility]
	  mailingAddress: MailingAddress
	  DBInformationOpeningTimes: OpeningTimes
	  localServiceStaffAvailability: OpeningTimes
	  aufgabentraeger: StationContact
	  timeTableOffice: StationContact
	  szentrale: StationContact
	  stationManagement: StationContact
	  arrivalDepatureBoard: ArrivalDepatureBoard
    parkingSpaces: [ParkingSpace]
  }
  
  type Location {
	  latitude: Float
	  longitude: Float
  }
  
  type Facility {
	  description: String
	  type: String
	  state: String!
	  equipmentnumber: Int
	  location: Location
  }
  
  type Product {
	  name: String
	  class: Int
	  productCode: Int
	  productName: String
  }
  
  type MailingAddress {
	  city: String
	  zipcode: String
	  street: String
  }
  
  type RegionalArea {
	  number: Int
	  name: String
	  shortName: String
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
    stations: [Station]
    parkingSpaces: [ParkingSpace]
    travelCenter: TravelCenter
    flinksterCars: [FlinksterCar]
    bikes: [CallABikeBike]
  }

  type ParkingSpace {
    id: Int
    name: String
    lots: Int
    latitude: Float
    longitude: Float
    occupancy: Occupancy
    bundesland: String
    isPublished: Boolean
    parkraumAusserBetriebText: String
    parkraumAusserBetrieb_en: String
    parkraumBahnhofName: String
    parkraumBahnhofNummer: Int
    parkraumBemerkung: String
    parkraumBemerkung_en: String
    parkraumBetreiber: String
    parkraumDisplayName: String
    parkraumEntfernung: String
    parkraumGeoLatitude: String
    parkraumGeoLongitude: String
    parkraumId: String
    parkraumIsAusserBetrieb: Boolean
    parkraumIsDbBahnPark: Boolean
    parkraumIsOpenData:  Boolean
    parkraumIsParktagesproduktDbFern: Boolean
    parkraumKennung: String
    parkraumName: String
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
    evaId: Int
  }

  type Occupancy {
    validData: Boolean
    timestamp: String
    timeSegment: String
    category: Int
    text: String
  }
  
  type ArrivalDepatureBoard {
	  nextArrivals: [TrainInStation]
	  nextDepatures: [TrainInStation]
  }
  
  type TrainInStation {
	  type: String
	  trainNumber: String
	  platform: String
	  time: String
	  stops: [String]
  }

  type TravelCenter {
    id: Int
    name: String 
    address: MailingAddress
    type: String
    lat: Float
    lon: Float
  }

  type FlinksterCar {
    id: String
    name: String
    description: String
    attributes: CarAttributes
    location: Location
    priceOptions: [PriceOption]
    address: MailingAddress
    rentalModel: String
    fillLevel: Int
    fuel: String
  }

  type CallABikeBike {
    id: String
    name: String
    description: String
    location: Location
    priceOptions: [PriceOption]
    attributes: BikeAttributes
    address: MailingAddress
    rentalModel: String
  }

  type CarAttributes {
    seats: Int
    color: String
    doors: Int
    transmissionType: String
    licensePlate: String
  }

  type BikeAttributes {
    licensePlate: String
  }

  type PriceOption {
    interval: Int
    type: String
    grossamount: Float
    currency: String
    taxrate: Float
    preferredprice: Boolean
  }

`);

module.exports = schema;

//   evaNumbers:
//    [ { number: 8000261,
//        geographicCoordinates: [Object],
//        isMain: Boolean },
//      { number: 8070193, isMain: Boolean },
//      { number: 8098263,
//        geographicCoordinates: [Object],
//        isMain: Boolean },
//      { number: 8098261,
//        geographicCoordinates: [Object],
//        isMain: Boolean },
//      { number: 8098262,
//        geographicCoordinates: [Object],
//        isMain: Boolean } ],
//   ril100Identifiers:
//    [ { rilIdentifier: 'MH',
//        isMain: Boolean,
//        hasSteamPermission: Boolean,
//        geographicCoordinates: [Object] },
//      { rilIdentifier: 'MH  S',
//        isMain: Boolean,
//        hasSteamPermission: Boolean },
//      { rilIdentifier: 'MH  N',
//        isMain: Boolean,
//        hasSteamPermission: Boolean },
//      { rilIdentifier: 'MHT',
//        isMain: Boolean,
//        hasSteamPermission: Boolean,
//        geographicCoordinates: [Object] } ] }
