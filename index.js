'use strict';

const argv = require('minimist')(process.argv.slice(2));
const helpCommand = require('./commands/help');
const configureCommand = require('./commands/configure');
const createCommand = require('./commands/create');

if (Object.keys(argv._).length === 0) {
  helpCommand.showUsageAll();
} else {
  const subCommand = argv._.shift();
  if (subCommand === 'configure') {
    if (Object.keys(argv._).length === 2) {
      (new configureCommand()).execute(argv._.shift(), argv._.shift());
    } else {
      helpCommand.showUsageConfigure();
    }
  } else if (subCommand === 'create') {
    (new createCommand()).execute();
  } else {
    helpCommand.showUsageAll();
  }
}
