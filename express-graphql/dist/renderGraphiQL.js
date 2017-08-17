'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGraphiQL = renderGraphiQL;


// Current latest version of GraphiQL.
var GRAPHIQL_VERSION = '0.10.1';

// Ensures string values are safe to be used within a <script> tag.

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function safeSerialize(data) {
  return data ? JSON.stringify(data).replace(/\//g, '\\/') : 'undefined';
}


const introductionDemoQuery = `# Welcome to 1BahnQL
#
# GraphiQL is an in-browser IDE for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will
# see intelligent typeaheads aware of the current GraphQL type schema and
# live syntax and validation errors highlighted within the text.
#
# To bring up the auto-complete at any point, just press Ctrl-Space.
#
# Press the run button above, or Cmd-Enter to execute the query, and the result
# will appear in the pane to the right.
#
# Learning resources:
# GraphQL: http://graphql.org
# GraphiQL: https://github.com/graphql/graphiql
# 1BahnQL: https://github.com/dbsystel/1BahnQL
#
#
# Example queries:
# Just comment out the query you would like to test and press the run button above,
# or Cmd-Enter to execute the query

{
  stationWithEvaId(evaId: 8000105) {
    name
    location {
      latitude
      longitude
    }
    picture {
      url
    }
  }
}

# More complex query examples:
#
# Querys 5 stations in a distance of 2000m with their corresponding facilities and location
# {
#   nearby(latitude: 50.11, longitude: 8.66, radius: 2000) {
#     stations(count: 5) {
#       name
#       primaryEvaId
#       location {
#         latitude
#         longitude
#       }
#       facilities {
#         type
#         state
#         description
#         equipmentNumber
#       }
#     }
#   }
# }
#
# Querys stations and operationLocations (Betriebsstellen) matching the searchterm "Flughafen"
# {
#   search(searchTerm: "Flughafen") {
#     stations {
#       name
#       primaryEvaId
#     }
#     operationLocations {
#       name
#       id
#       regionId
#       abbrev
#       locationCode
#     }
#   }
# }
`

/**
 * When express-graphql receives a request which does not Accept JSON, but does
 * Accept HTML, it may present GraphiQL, the in-browser GraphQL explorer IDE.
 *
 * When shown, it will be pre-populated with the result of having executed the
 * requested query.
 */
function renderGraphiQL(data) {
  var queryString = data.query;

  var variablesString = data.variables ? JSON.stringify(data.variables, null, 2) : null;
  var resultString = data.result ? JSON.stringify(data.result, null, 2) : null;
  var operationName = data.operationName;

  /* eslint-disable max-len */
  return '<!--\nThe request to this GraphQL server provided the header "Accept: text/html"\nand as a result has been presented GraphiQL - an in-browser IDE for\nexploring GraphQL.\n\nIf you wish to receive JSON, provide the header "Accept: application/json" or\nadd "&raw" to the end of the URL within a browser.\n-->\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8" />\n  <title>GraphiQL</title>\n  <meta name="robots" content="noindex" />\n  <style>\n    html, body {\n      height: 100%;\n      margin: 0;\n      overflow: hidden;\n      width: 100%;\n    }\n  </style>\n  <link href="//cdn.jsdelivr.net/graphiql/' + GRAPHIQL_VERSION + '/graphiql.css" rel="stylesheet" />\n  <script src="//cdn.jsdelivr.net/fetch/0.9.0/fetch.min.js"></script>\n  <script src="//cdn.jsdelivr.net/react/15.4.2/react.min.js"></script>\n  <script src="//cdn.jsdelivr.net/react/15.4.2/react-dom.min.js"></script>\n  <script src="//cdn.jsdelivr.net/graphiql/' + GRAPHIQL_VERSION + '/graphiql.min.js"></script>\n</head>\n<body>\n  <script>\n    // Collect the URL parameters\n    var parameters = {};\n    window.location.search.substr(1).split(\'&\').forEach(function (entry) {\n      var eq = entry.indexOf(\'=\');\n      if (eq >= 0) {\n        parameters[decodeURIComponent(entry.slice(0, eq))] =\n          decodeURIComponent(entry.slice(eq + 1));\n      }\n    });\n\n    // Produce a Location query string from a parameter object.\n    function locationQuery(params) {\n      return \'?\' + Object.keys(params).map(function (key) {\n        return encodeURIComponent(key) + \'=\' +\n          encodeURIComponent(params[key]);\n      }).join(\'&\');\n    }\n\n    // Derive a fetch URL from the current URL, sans the GraphQL parameters.\n    var graphqlParamNames = {\n      query: true,\n      variables: true,\n      operationName: true\n    };\n\n    var otherParams = {};\n    for (var k in parameters) {\n      if (parameters.hasOwnProperty(k) && graphqlParamNames[k] !== true) {\n        otherParams[k] = parameters[k];\n      }\n    }\n    var fetchURL = locationQuery(otherParams);\n\n    // Defines a GraphQL fetcher using the fetch API.\n    function graphQLFetcher(graphQLParams) {\n      return fetch(fetchURL, {\n        method: \'post\',\n        headers: {\n          \'Accept\': \'application/json\',\n          \'Content-Type\': \'application/json\'\n        },\n        body: JSON.stringify(graphQLParams),\n        credentials: \'include\',\n      }).then(function (response) {\n        return response.text();\n      }).then(function (responseBody) {\n        try {\n          return JSON.parse(responseBody);\n        } catch (error) {\n          return responseBody;\n        }\n      });\n    }\n\n    // When the query and variables string is edited, update the URL bar so\n    // that it can be easily shared.\n    function onEditQuery(newQuery) {\n      parameters.query = newQuery;\n      updateURL();\n    }\n\n    function onEditVariables(newVariables) {\n      parameters.variables = newVariables;\n      updateURL();\n    }\n\n    function onEditOperationName(newOperationName) {\n      parameters.operationName = newOperationName;\n      updateURL();\n    }\n\n    function updateURL() {\n      history.replaceState(null, null, locationQuery(parameters));\n    }\n\n    // Render <GraphiQL /> into the body.\n    ReactDOM.render(\n      React.createElement(GraphiQL, {\n        fetcher: graphQLFetcher,\n        onEditQuery: onEditQuery,\n        onEditVariables: onEditVariables,\n        onEditOperationName: onEditOperationName,\n        query: ' + safeSerialize(queryString) + ',\n        defaultQuery: ' + JSON.stringify(introductionDemoQuery) + ',\n        response: ' + safeSerialize(resultString) + ',\n        variables: ' + safeSerialize(variablesString) + ',\n        operationName: ' + safeSerialize(operationName) + ',\n      }),\n      document.body\n    );\n  </script>\n</body>\n</html>';
}
