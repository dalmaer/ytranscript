window.onload = function() {
  $$('.ytranscript').each(function(e) {
    var player = e.readAttribute("for");
    var playerEmbed = player + "Embed";
    initPlayer(player, playerEmbed);
    
    var lis = e.getElementsByTagName("li");
    var odd = 1;
    $A(lis).each(function(li) {
      var starttime = li.readAttribute('starttime');
      li.innerHTML = li.innerHTML + " <span class='timing'>" + parseInt(starttime) + " secs</span>";
      li.addClassName( (odd++ % 2) ? "odd" : "even");
      li.writeAttribute("title", "Send the player to this location");
      li.onclick = function() {
        makeSureVideoIsPlaying($(playerEmbed));
        $(playerEmbed).seekTo(starttime, true);
      };
    });
  });
}

function makeSureVideoIsPlaying(playerEmbed) {
  if (playerEmbed.getState && $(playerEmbed).getState() == -1) { // -1 unstarted
    playerEmbed.playVideo(); // play if we haven't started
  }
}

function initPlayer(player, playerEmbed) {
  var url = $(player).readAttribute('url');
  var so = new SWFObject(url + "&enablejsapi=1&playerapiid=my" + playerEmbed, playerEmbed, 432, 400, 8);
  so.addParam("AllowScriptAccess", "always");
  so.write(player);
}

function onYouTubePlayerReady(playerId) {}
