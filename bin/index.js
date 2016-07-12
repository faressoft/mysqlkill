#!/usr/bin/env node

/**
 * MySQL Process Manager
 */

var options     = require('../options.js')
  , connection  = require('../connection.js')
  , processList = require('../processList.js');

// Parse command line options
options().then(function(options) {

  // Create a MySQL connection
  var conn = connection(options.host, options.user, options.password);

  // Show the process list and kill the selected processes
  processList(conn);

});
