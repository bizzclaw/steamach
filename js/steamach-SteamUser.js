var apiKeys = require("./../.env");
const steamKey = apiKeys.steamAPI;

export class SteamUser {

  static getGame(appid, callback) {
    $.ajax({
      url: `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${steamKey}&appid=${appid}`,
      type: "GET",
      data: {
        format: "json"
      },
      success: function(response) {
        callback(response.game)
      },
      error: function(error) {
        callback(false, error)
      }
    })
  }

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
      error: function(error) {
        console.log("Call Failed: " + error);
        data.error(error);
      }
    });
  }

  constructor(info) {
    this.summary = info
  }

  GetLibrary(callback) {
    let id = this.summary.steamid
    $.ajax({
      url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${id}&format=json&include_appinfo=1`,
      type: "GET",
      data: {
        format: "json"
      },
      success: function(response) {
        callback(response.response.games)
      },
      error: function(error) {
        callback(false)
      }
    });
  }

  GetAchievements(appid, callback) {
    let id = this.summary.steamid;
    $.ajax({
      url: `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${steamKey}&steamid=${id}`,
      type: "GET",
      data: {
        format: "json"
      },
      success: function(response) {
        callback(response.playerstats.achievements)
      },
      error: function(error) {
        callback(false)
      }
    });
  }
}
