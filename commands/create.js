'use strict';

const WunderlistSdk = require('Wunderlist');
const Configuration = require('./util/configuration');

module.exports = class CreateCommand {

  constructor() {
    this.command = "create";
    this.configuration = (new Configuration()).load();
    this.wunderListClient = new WunderlistSdk({
      accessToken: "<YOUR_ACCESS_TOKEN>",
      clientID: "<YOUR_CLIENT_ID>"
    });
  }

  execute() {
    // FIX ME:use Promise like below.
    // const wlbatch = new WlBatch({at, clientID});
    // wlbatch.listUpLists().acceptUserInput().addTask();

    this.wunderListClient.http.lists.all()
      .done(lists => {
        console.log("Select one of indexes below to add a recurrence task");
        lists.forEach((list, index) => {
          console.log("%d: %s(%d)", index, list.title, list.id);
        });

        console.log("> ");

        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        var selectedListId = '';
        process.stdin.on('data', chunk => {
          selectedListId += chunk;
        });

        process.stdin.on('end', () => {
          // There will be a trailing \n from the user hitting enter. Get rid of it.
          selectedListId = selectedListId.replace(/\n$/, '');
          console.log("selectedListId: %s", selectedListId);

          const obj = {
            list_id: parseInt(selectedListId, 10),           // eslint-disable-line camelcase
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
