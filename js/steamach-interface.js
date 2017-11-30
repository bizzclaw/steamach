import {SteamUser} from "./../js/steamach-steamuser.js";

$(document).ready(function() {

  let user1;
  let user2;

  $("#steam-user").submit(function(event) {
    event.preventDefault();
    let userId1 = $("#steamuser-1").val()
    let userId2 = $("#steamuser-2").val()
    SteamUser.getUsers({
      steamIds: [userId1, userId2],
      success: function(steamUsers) {
        user1 = steamUsers[userId1];
        user2 = steamUsers[userId2];

        if (!user1 || !user2) {
          $("#steamid-error").text("Invalid SteamID entered");
        }
        else {
          $("#steamid-error").empty()
          $("#gamelist").empty()
          let sharedGames = []
          console.log("???");
          user1.GetLibrary(function(user1Games) {
            user2.GetLibrary(function(user2Games){

              user1Games.forEach(function(user1Game) {
                let id = user1Game.appid;
                user2Games.forEach(function(user2Game){
                  if (user2Game.appid === id) {
                    sharedGames.push(user2Game);
                  }
                });
              });

              sharedGames.forEach(function(game) {
                if (game.img_logo_url === "") {
                  return false;
                }
                $("#gamelist").append(`
                  <div class = "game">
                  <img value=${game.appid} class="gameimg" src="http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg">
                  </div>
                  `);
              });

              $(".gameimg").click(function() {

                $("#ach-yours, #ach-shared, #ach-theirs, #ach-neither").empty();

                let appid = $(this).attr("value");
                user1.GetAchievements(appid, function(user1achievements) {
                  user2.GetAchievements(appid, function(user2achievements) {
                    let filled = {}

                    SteamUser.getGame(appid, function(game) {
                      let achPanel = $("#achievements-title")
                      let achievements = game.availableGameStats.achievements
                      if (! achievements) {
                        achPanel.text(game.gameName + " has no Achievements")
                      }
                      else {
                        achPanel.text(game.gameName + ` has ${achievements.length} Achievements`)
                        for (let k=0; k<achievements.length; k++) {
                          let v = achievements[k];
                          let user1Unlocked = user1achievements[k].achieved === 1;
                          let user2Unlocked = user2achievements[k].achieved === 1;
                          let outputId;
                          if (user1Unlocked & !user2Unlocked) {
                            outputId = "yours";
                          }
                          else if (user1Unlocked & user2Unlocked) {
                            outputId = "shared";
                          }
                          else if (!user1Unlocked & user2Unlocked) {
                            outputId = "theirs";
                          }
                          else {
                            outputId = "neither";
                          }
                          let outPutPanel = $("#ach-"+outputId)

                          if (! filled[outputId]) {
                            outPutPanel.append(`<h2>`+ outPutPanel.attr("name") +`</h2>`)
                            filled[outputId] = true
                          }

                          outPutPanel.append(`
                            <div class="row achievement no-padding">
                              <div class="col-md-5" class="no-padding">
                                <img class="ach-icon" src="${v.icon}">
                              </div>
                              <div class="col-md-7 ach-info no-padding">
                                <h3>${v.displayName}</h3>
                                <p>${v.description}</p>
                              </div>
                            </div>
                          `)
                        }
                      }
                    })
                  });
                });
              });
            });
          });
        }
      },
      error: function(error) {
        console.log(error);
      }
    })
  });

});
