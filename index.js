const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const TrainRouteSearch = require('./trainRouteSearch');
const { ParkingSpaceQuery } = require('./ParkingSpaceQuery');
const NearbyQuery = require('./NearbyQuery');

const StationLoader = require('./Station/StationLoader')
const StationService = require('./Station/StationService')

const APIToken = process.env.DBDeveloperAuthorization
const stationLoader = new StationLoader(APIToken);
const stationService = new StationService(stationLoader);

const root = {
  routeSearch: (args) => {
    const routeSearch = new TrainRouteSearch(args.from, args.to).options;
    return routeSearch.then(options => [options[0]]);
  },
  parkingSpace: (args) => {
    const parkingSpaceQuery = new ParkingSpaceQuery(args.id).options;
    return parkingSpaceQuery.then(options => options);
  },
  stationWith: (args) => stationService.stationByEvaId(args.evaId),
  search: (args) => { 
    return { stations: stationService.searchStations(args.searchTerm) } 
  },
  nearby: (args) => { 
    return new NearbyQuery(args.lat, args.lon);
  },
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

