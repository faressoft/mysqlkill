var commander = require('commander')
  , inquirer  = require('inquirer');

/**
 * Handle the command line options to enter host, user, password
 * 
 * @return {Promise} pass on success {host, user, password}
 */
module.exports = function() {

  return new Promise(function(resolve, reject) {

    commander
      .usage('-h <hostname> -u <username> [-p <password>]')
      .option('-h, --host <host>', 'Host name')
      .option('-u, --user <user>', 'User name')
      .option('-p, --password <password>', 'Password')
      .parse(process.argv);

    // Host and user is not passwd as options
    if (typeof commander.host === 'undefined' || typeof commander.user === 'undefined') {
      commander.outputHelp();
      return reject();
    }

    // The password is not passed as an option (optional)
    if (typeof commander.password === 'undefined') {

      var questions = [
        {
          type: 'password',
          name: 'password',
          message: 'Enter password'
        }
      ];

      // Ask the user to enter the password
      inquirer.prompt(questions).then(function(answers) {

        resolve({
          host: commander.host,
          user: commander.user,
          password: answers.password
        });

      });

    }
    
  });
  
};
