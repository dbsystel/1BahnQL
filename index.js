const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const TrainRouteSearch = require("./trainRouteSearch.js")
const ParkingSpaceQuery = require('./ParkingSpaceQuery.js');
const { loadStationEva, searchStations } = require("./station.js")

const root = {
  hello: () => 'Hello world!',
  routeSearch: (args) => {
    const routeSearch = new TrainRouteSearch(args.from, args.to).options;
    return routeSearch.then(options => [options[0]]);
  },
  parkingSpace: (args) => {
    const parkingSpaceQuery = new ParkingSpaceQuery(args.id).options;
    return parkingSpaceQuery.then(options => options);
  },
  stationWith: (args) => loadStationEva(args.evaId),
  search: (args) => { return { stations: searchStations(args.searchTerm) }
}}

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

