var { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String,
	route: Route
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
	  number: ID
	  name: String
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
	  regionalbereich: Regionalbereich
	  id: Int
	  facilities: [Facility]
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
  
  type MailingAdress {
	  city: String
	  zipcode: String
	  street: String
  }
  
  type Regionalbereich {
	  number: Int
	  name: String
	  shortName: String
  }
`);

module.exports = schema


// { number: 4234,
//   name: 'München Hbf',
//   mailingAddress: { city: 'München', zipcode: '80335', street: 'Bayerstr. 10a' },
//   category: 1,
//   hasParking: Boolean,
//   hasBicycleParking: Boolean,
//   hasLocalPublicTransport: Boolean,
//   hasPublicFacilities: Boolean,
//   hasLockerSystem: Boolean,
//   hasTaxiRank: Boolean,
//   hasTravelNecessities: Boolean,
//   hasSteplessAccess: 'yes',
//   hasMobilityService: 'Ja, um Voranmeldung unter 01806 512 512 wird gebeten',
//   federalState: 'Bayern',
//   regionalbereich: { number: 7, name: 'RB Süd', shortName: 'RB S' },
//   aufgabentraeger:
//    { shortName: 'Bayerische Eisenbahngesellschaft mbH',
//      name: 'BEG' },
//   DBinformation:
//    { availability:
//       { monday: [Object],
//         tuesday: [Object],
//         wednesday: [Object],
//         thursday: [Object],
//         friday: [Object],
//         saturday: [Object],
//         sunday: [Object],
//         holiday: [Object] } },
//   localServiceStaff:
//    { availability:
//       { monday: [Object],
//         tuesday: [Object],
//         wednesday: [Object],
//         thursday: [Object],
//         friday: [Object],
//         saturday: [Object],
//         sunday: [Object],
//         holiday: [Object] } },
//   timeTableOffice:
//    { email: 'DBS.Fahrplan.SuedBayern@deutschebahn.com',
//      name: 'Bahnhofsmanagement München' },
//   szentrale:
//    { number: 38,
//      publicPhoneNumber: '089/13081055',
//      name: 'München Hbf' },
//   stationManagement: { number: 250, name: 'München' },
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