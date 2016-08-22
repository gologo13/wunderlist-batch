'use strict';

const argv = require('minimist')(process.argv.slice(2));
const helpCommand = require('./commands/help');

if (Object.keys(argv._).length === 0) {
  helpCommand.showUsage();
} else {
  const subCommand = argv._.shift();
  try {
    new (require('./commands/' + subCommand))().execute(argv._);
  } catch (err) {
    console.error(err);
    helpCommand.showUsage(subCommand);
  }
}
