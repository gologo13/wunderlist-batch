'use strict';

const WunderlistSdk = require('Wunderlist');
const Configuration = require('./util/configuration');

module.exports = class CreateCommand {

  constructor() {
    this.command = "create";

    const configuration = new Configuration();
    configuration.load();

    this.wunderListClient = new WunderlistSdk({
      accessToken: configuration.accessToken,
      clientID: configuration.clientId
    });
  }

  execute() {
    // FIX ME: refactor with Promise.
    this.wunderListClient.http.lists.all()
      .done(lists => {
        var indexHash = {};

        console.log("You have the followings lists in Wunderlist.");

        lists.forEach((list, index) => {
          console.log("%d: %s(%d)", index, list.title, list.id);
          indexHash[index] = list.id;
        });

        console.log("");
        console.log("Select one of indexes to add a recurrence task");

        process.stdout.write("> ");

        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        var selectedIndex = '';
        process.stdin.on('data', chunk => {
          selectedIndex += chunk;
        });

        process.stdin.on('end', () => {
          // FIX ME: handle out of index.

          // There will be a trailing \n from the user hitting enter. Get rid of it.
          selectedIndex = selectedIndex.replace(/\n$/, '');
          console.log("selectedIndex: %s", selectedIndex);
          console.log("selectedListId: %s", indexHash[selectedIndex]);

          const obj = {
            list_id: parseInt(indexHash[selectedIndex], 10),           // eslint-disable-line camelcase
            title: "WLBatch test"
          };
          console.log(obj);

          this.wunderListClient.http.tasks.create(obj)
            .done(res => {
              console.log(res);
            })
            .fail(error => {
              console.error('Failed to create a task: %s', JSON.stringify(error));
            });
        });
      })
      .fail(error => {
        console.error('Failed to get lists: %s', JSON.stringify(error));
      });
  }

};
