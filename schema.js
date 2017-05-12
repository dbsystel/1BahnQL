var { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String,
	routeSearch(from: Int, to: Int): [Route]
	stationWith(evaId: Int): Station 
	search(searchTerm: String): Searchable
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
	  primaryRill100: String
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
  }
  
  type Location {
	  latitude: Float
	  longitude: Float
  }
  
  type Facility {
	  description: String
	  type: String
	  state: String
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
`);

module.exports = schema


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