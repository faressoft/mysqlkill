var chalk    = require('chalk')
  , inquirer = require('inquirer');

/**
 * The maximum length of the displayed
 * characters of the queries
 * @type {Number}
 */
const MAX_QUERY_LENGTH = 70;

/**
 * Show processlist and handle the killing
 * 
 * @param {Object} connection MySQL connection object
 */
module.exports = function(connection) {

  (function showProcessList() {
    
    connection.query('SHOW PROCESSLIST', function(error, rows, fields) {

      if (error) {
        return process.exit();
      }

      rows = [
        {
          Id: 21,
          Command: 'Qeury',
          Info: 'SELECT DISTINC id, name, age, telephone, email, username, mobile FROM users'
        },
        {
          Id: 24,
          Command: 'Qeury',
          Info: 'SELECT DISTINC age, id, telephone, name, email, username, mobile FROM users'
        },
        {
          Id: 31,
          Command: 'Qeury',
          Info: 'SELECT DISTINC email, name, age, id, telephone, username, mobile FROM users'
        },
        {
          Id: 35,
          Command: 'Qeury',
          Info: 'SELECT DISTINC username, id, name, age, telephone, email, mobile FROM users'
        }
      ];

      // No active processes
      if (rows.length <= 1) {
        console.log('No active processes');
        process.exit();
      }

      var processList = [];

      rows.forEach(function(processItem) {

        if (processItem.Info === 'SHOW PROCESSLIST') {
          return;
        }

        if (processItem.Info) {
          processItem.Info = processItem.Info.replace(/\s+/g, ' ');
          // Limit the length of the displated query
          if (processItem.Info.length > MAX_QUERY_LENGTH) {
            processItem.Info = processItem.Info.substr(0, MAX_QUERY_LENGTH) + '...';
          }
        }

        processList.push(' ' + processItem.Id + '\t' + chalk.green(processItem.Command) + '\t' + processItem.Info);

      });

      var questions = [
        {
          type: 'checkbox',
          name: 'processes',
          message: 'Choose a process to kill',
          choices: processList
        }
      ];

      // Select component and action
      inquirer.prompt(questions).then(function(answers) {

        var killQueries = [];

        answers.processes.forEach(function(item) {
          var porcessId = parseInt(item.split('\t')[0]);
          killQueries.push('KILL ' + porcessId);
        });

        // Kill the selected processes
        connection.query(killQueries.join('; '), function(error) {

          if (!error) {
            console.log(killQueries.join('\n'));
          }

          process.exit();

        });


      });

    });
    
  })();
  
};
