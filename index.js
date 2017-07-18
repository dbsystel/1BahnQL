const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const RoutingService = require('./Routing/RoutingService.js');
const { ParkingSpaceQuery } = require('./ParkingSpaceQuery');
const NearbyQuery = require('./NearbyQuery');
const routingService = new RoutingService()
const APIToken = process.env.DBDeveloperAuthorization;
const OperationLocationLoader = require('./OperationLocation/OperationLocationLoader.js');
const OperationLocationService = require('./OperationLocation/OperationLocationService.js');
const StationLoader = require('./Station/StationLoader');
const StationService = require('./Station/StationService');
const NearbyStationService = require('./Station/NearbyStationsService.js');

const operationLocationLoader = new OperationLocationLoader(APIToken);
const operationLocationService = new OperationLocationService(operationLocationLoader);
const stationLoader = new StationLoader(APIToken);
const stationService = new StationService(stationLoader);
const nearbyStationService = new NearbyStationService(stationService);

let root = {
  parkingSpace: (args) => {
    const parkingSpaceQuery = new ParkingSpaceQuery(args.id).options;
    return parkingSpaceQuery.then(options => options);
  },
  stationWith: args => stationService.stationByEvaId(args.evaId),
  search: args => ({ stations: stationService.searchStations(args.searchTerm), operationLocations: operationLocationService.searchOperationLocations(args.searchTerm) }),
  nearby: args => new NearbyQuery(args.latitude, args.longitude, nearbyStationService),
};

const experimental = process.env.experimental
if(experimental) {
  root.routing = (args) => {
    const routeSearch = routingService.routes(args.from, args.to);
    return routeSearch.then(options => [options[0]]);
  }
}


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
