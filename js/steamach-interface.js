import {SteamUser} from "./../js/steamach-steamuser.js";

$(document).ready(function() {

  let user1;
  let user2;

  $("#steam-user").submit(function(event) {
    event.preventDefault();
    user1 = new SteamUser($("#steamuser-1").val());
    user2 = new SteamUser($("#steamuser-2").val());

  });

});
