const { graphql } = require('graphql');
const schema = require("./schema.js")
const express = require('express');
const graphqlHTTP = require('express-graphql');
const TrainRouteSearch = require("./trainRouteSearch.js")
const { loadStationEva, searchStations} = require("./station.js")


var root = { hello: () => 'Hello world!', routeSearch: function(args) {
	let routeSearch = new TrainRouteSearch(args.from, args.to).options
	return routeSearch.then(function(options) { return [options[0]] })
}, stationWith: (args) => loadStationEva(args.evaId),
search: (args) => { return { stations: searchStations(args.searchTerm)} }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
// set the port of our application
 // process.env.PORT lets the port be set by Heroku
 const port = process.env.PORT || 8080;
 
 app.listen(port, () => console.log(`now browse to localhost:${port}/graphql`));


