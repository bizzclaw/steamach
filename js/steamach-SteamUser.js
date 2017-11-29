var apiKeys = require("./../.env");
const steamKey = apiKeys.steamAPI;

export class SteamUser {
  constructor(steamId) {
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
  }

  GetLibrary() {
    return [];
  }
}
