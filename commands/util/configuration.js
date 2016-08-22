'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class Configuration {

  save(accessToken, clientId, callback) {
    fs.writeFile(
      Configuration.getPath(),
      JSON.stringify({accessToken, clientId}),
      callback
    );
  }

  load() {
    const data = JSON.parse(fs.readFileSync(Configuration.getPath(), {encoding: 'utf8'}));
    this._accessToken = data.accessToken;
    this._clientId = data.clientId;
  }

  get clientId() {
    return this._clientId;
  }

  get accessToken() {
    return this._accessToken;
  }

  set clientId(clientId) {
    this._clientId = clientId;
  }

  set accessToken(accessToken) {
    this._accessToken = accessToken;
  }

  static getPath() {
    return path.join(this.getHomeDir(), this.getFileName());
  }

  static getFileName() {
    return ".wlbrc";
  }

  static getHomeDir() {
    return process.env.HOME;
  }
};
