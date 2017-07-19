const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const TrainRouteSearch = require('./trainRouteSearch');
const { ParkingSpaceQuery } = require('./ParkingSpaceQuery');
const NearbyQuery = require('./NearbyQuery');
const APIToken = process.env.DBDeveloperAuthorization;
const OperationLocationLoader = require('./OperationLocation/OperationLocationLoader.js');
const OperationLocationService = require('./OperationLocation/OperationLocationService.js');
const StationLoader = require('./Station/StationLoader');
const StationService = require('./Station/StationService');
const NearbyStationService = require('./Station/NearbyStationsService.js');
const FacilityLoader = require('./Facility/FacilityLoader.js');
const FacilityService = require('./Facility/FacilityService.js');

const operationLocationLoader = new OperationLocationLoader(APIToken);
const operationLocationService = new OperationLocationService(operationLocationLoader);
const facilityLoader = new FacilityLoader(APIToken);
const facilityService = new FacilityService(facilityLoader)
const stationLoader = new StationLoader(APIToken);
const stationService = new StationService(stationLoader, null, facilityService);
const nearbyStationService = new NearbyStationService(stationService);


const root = {
  routeSearch: (args) => {
    const routeSearch = new TrainRouteSearch(args.from, args.to).options;
    return routeSearch.then(options => [options[0]]);
  },
  parkingSpace: (args) => {
    const parkingSpaceQuery = new ParkingSpaceQuery(args.id).options;
    return parkingSpaceQuery.then(options => options);
  },
  stationWith: args => stationService.stationByEvaId(args.evaId),
  search: args => ({ stations: stationService.searchStations(args.searchTerm), operationLocations: operationLocationService.searchOperationLocations(args.searchTerm) }),
  nearby: args => new NearbyQuery(args.latitude, args.longitude, nearbyStationService),
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`now browse to localhost:${port}/graphql`));
