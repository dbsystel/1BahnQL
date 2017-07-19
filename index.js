const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const TrainRouteSearch = require('./trainRouteSearch');

const ParkingspaceLoader = require('./Parkingspace/ParkingspaceLoader');
const FlinksterLoader = require('./Flinkster/FlinksterLoader');
const StationLoader = require('./Station/StationLoader');
const OperationLocationLoader = require('./OperationLocation/OperationLocationLoader');

const ParkingspaceService = require('./Parkingspace/ParkingspaceService');
const FlinksterService = require('./Flinkster/FlinksterService');
const OperationLocationService = require('./OperationLocation/OperationLocationService');
const StationService = require('./Station/StationService');
const NearbyStationService = require('./Station/NearbyStationsService');

const StationRelationships = require('./Station/StationRelationships');
const ParkingspaceRelationships = require('./Parkingspace/ParkingspaceRelationships');

const NearbyQuery = require('./NearbyQuery');

// --------- //

const APIToken = process.env.DBDeveloperAuthorization;

// Loader
const parkingspaceLoader = new ParkingspaceLoader(APIToken);
const stationLoader = new StationLoader(APIToken);
const operationLocationLoader = new OperationLocationLoader(APIToken);
const flinksterLoader = new FlinksterLoader(APIToken);

// Services
const parkingspaceService = new ParkingspaceService(parkingspaceLoader);
const operationLocationService = new OperationLocationService(operationLocationLoader);
const stationService = new StationService(stationLoader);
const nearbyStationService = new NearbyStationService(stationService);
const flinksterService = new FlinksterService(flinksterLoader);

// Relationships
stationService.relationships = new StationRelationships(parkingspaceService);
parkingspaceService.relationships = new ParkingspaceRelationships(parkingspaceService, stationService);

// Queries
const root = {
  routeSearch: (args) => {
    const routeSearch = new TrainRouteSearch(args.from, args.to).options;
    return routeSearch.then(options => [options[0]]);
  },
  parkingSpace: args => parkingspaceService.parkingspaceBySpaceId(args.id),
  stationWith: args => stationService.stationByEvaId(args.evaId),
  search: args => ({ stations: stationService.searchStations(args.searchTerm), operationLocations: operationLocationService.searchOperationLocations(args.searchTerm) }),
  nearby: args => new NearbyQuery(args.latitude, args.longitude, nearbyStationService, parkingspaceService, flinksterService),
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
