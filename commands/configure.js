'use strict';

const format = require('util').format;
const Configuration = require('./util/configuration');
const Constant = require('./util/constant');

module.exports = class ConfigureCommand {

  constructor() {
    this.command = "configure";
  }

  execute(args) {
    this.checkArgs(args);

    const accessToken = args.shift();
    const clientId = args.shift();
    const configuration = new Configuration();

    configuration.save(accessToken, clientId, err => {
      if (err) throw err;
      console.log("Successfully created: %s", Configuration.getPath());
    });
  }

  checkArgs(args) {
    if (args.length !== 2) {
      throw new Error(format("%s %s: invalid argument", Constant.PROGRAM_NAME, this.command));
    }
  }

};

