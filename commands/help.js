'use strict';

module.exports = class HelpCommand {

  static showUsageAll() {
    this.showUsageConfigure();
  }

  static showUsageConfigure() {
    console.log("wlb configure <accessToken> <clientId>");
  }
};
