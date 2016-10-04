var mysql    = require('mysql')
  , chalk    = require('chalk')
  , inquirer = require('inquirer');

/**
 * Create a MySQL connection
 * 
 * @param  {String} host
 * @param  {String} user
 * @param  {String} password
 * @return {Object} MySQL connection object
 */
module.exports = function(host, user, password) {

  var connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    multipleStatements: true,
    insecureAuth: true
  });

  connection.connect(function(error) {
    if (error) {
      console.log(error.toString());
    }
  });

  return connection;
  
};
