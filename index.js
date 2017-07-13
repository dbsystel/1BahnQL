const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const TrainRouteSearch = require('./trainRouteSearch');

const ParkingspaceLoader = require('./Parkingspace/ParkingspaceLoader');
const ParkingspaceService = require('./Parkingspace/ParkingspaceService');

const APIToken = process.env.DBDeveloperAuthorization;

const parkingspaceLoader = new ParkingspaceLoader(APIToken);
const parkingspaceService = new ParkingspaceService(parkingspaceLoader);

const NearbyQuery = require('./NearbyQuery');
const { loadStationEva, searchStations } = require('./station');

const root = {
  routeSearch: (args) => {
    const routeSearch = new TrainRouteSearch(args.from, args.to).options;
    return routeSearch.then(options => [options[0]]);
  },
  parkingSpace: args => parkingspaceService.parkingspaceBySpaceId(args.id),
  stationWith: args => loadStationEva(args.evaId),
  search: args => ({ stations: searchStations(args.searchTerm) }),
  nearby: args => new NearbyQuery(args.lat, args.lon),
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

