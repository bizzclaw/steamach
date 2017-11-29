var apiKeys = require("./../.env");
const steamKey = apiKeys.steamAPI;

export class SteamUser {

  static getUsers(data) {
    let steamIds = ""
    data.steamIds.forEach(function(id) {
      steamIds += ","+id
    });
    $.ajax({
      url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamIds}`,
      type: "GET",
      data: {
        format: "json"
      },
      success: function(response) {

        let playerSummaries = response.response.players;
        let steamUsers = {};
        playerSummaries.forEach(function(summary) {
          steamUsers[summary.steamid] = new SteamUser(summary);
        });

        data.success(steamUsers);
      },
      backend: function(error) {
        this.passed = false;
        console.log("Call Failed: " + error);
        data.error(error);
      }
    });
  }

  constructor(info) {
    this.summary = info
  }

  GetLibrary(callback) {
    $.ajax({
      url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamId }`,
      type: "GET",
      data: {
        format: "json"
      },
      success: function(response) {
        this.summary = response.response.players[0];
        this.passed = true;
        console.log(this.summary);
      },
      backend: function(error) {
        this.passed = false;
        console.log("Call Failed: " + error);
      }
    });
    callback(resoult)
  }
}
