const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const RoutingService = require('./Routing/RoutingService.js');
const { ParkingSpaceQuery } = require('./ParkingSpaceQuery');
const NearbyQuery = require('./NearbyQuery');
const { loadStationEva, searchStations } = require('./station');
const routingService = new RoutingService()

let root = {
  parkingSpace: (args) => {
    const parkingSpaceQuery = new ParkingSpaceQuery(args.id).options;
    return parkingSpaceQuery.then(options => options);
  },
  stationWith: (args) => loadStationEva(args.evaId),
  search: (args) => {
    return { stations: searchStations(args.searchTerm) }
  },
  nearby: (args) => {
    return new NearbyQuery(args.lat, args.lon);
  },
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
