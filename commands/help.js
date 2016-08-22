'use strict';

const Constant = require('./util/constant');

module.exports = class HelpCommand {

  static showUsage(subCommand) {
    if (subCommand === undefined) {
      console.error("TBD");
    } else if (subCommand === 'configure') {
      console.error("[Usage] %s %s <accessToken> <clientId>", Constant.PROGRAM_NAME, subCommand);
    } else if (subCommand === 'create') {
      console.error("[Usage] %s %s", Constant.PROGRAM_NAME, subCommand);
    } else {
      console.error("[Usage] `%s` is undefined subcommand", subCommand);
    }
  }

};
