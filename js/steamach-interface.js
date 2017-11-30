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
          $("#steamid-error").text("");
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

              console.log(sharedGames);

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
