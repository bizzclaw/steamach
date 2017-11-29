import {SteamUser} from "./../js/steamach-steamuser.js";

$(document).ready(function() {

  let user1;
  let user2;

  $("#steam-user").submit(function(event) {
    event.preventDefault();
    let userId1 = $("#steamuser-1").val()
    let userId2 = $("#steamuser-2").val()
    console.log(userId1);
    SteamUser.getUsers({
      steamIds: [userId1, userId2],
      success: function(steamUsers) {
        user1 = steamUsers[userId1];
        user2 = steamUsers[userId2];

      },
      error: function() {

      }
    })

  });

});
