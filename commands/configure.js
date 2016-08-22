'use strict';

const Configuration = require('./util/configuration');

module.exports = class ConfigureCommand {

  constructor() {
    this.command = "configure";
  }

  execute(accessToken, clientId) {
    const configuration = new Configuration();
    configuration.save(accessToken, clientId, err => {
      if (err) throw err;
      console.log("Successfully created: %s", Configuration.getPath());
    });
  }
};

