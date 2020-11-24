var style = null;
var theme = null;
var twist = null;
var day = true;
var item1 = "";
var item2 = "";
var item3 = "";
var styles = ["SMB", "SMB3", "SMW", "NSMB", "3DW"];
var themes = ["Ground", "Underground", "Underwater", "Desert", "Snow", "Sky", "Forest", "Ghost House", "Airship", "Castle"];
var common = [" Arrow Signs", "Banzai Bills", "Bloopers", "Bob-ombs", "Boom Boom", "Boos", "Bullet Blasters", "Bull's-Eye Blasters", "Checkpoint Flags", "Conveyor Belts", "Dry Bones", "Dotted Line Blocks", "Falling Icicles", "Fast Snake Blocks", "Fire Piranha Plants", "Fishbones", "Goombas/Galoombas", "Green Cheep Cheeps", "Green Koopa Troopas", "Hammer Bros", "Key Doors", "Keys", "Lava Bubbles", "Lit Bob-ombs", "Magikoopas", "ON/OFF Switch", "Piranha Plants/Jumping Piranha Plants", "P Blocks", "P Switches", "P Warp Doors", "Pokeys/Snow Pokeys", "POW Blocks", "Red Cheep Cheeps", "Sideways Trampolines", "Sledge Bros", "Snake Blocks", "Spike Balls/Snowballs", "Spikes", "Spinies", "Stationary Icicles", "Thwomps", "Tracks", "Trampolines", "Twisters", "Warp Doors"];
var exclusives_not_tdw = ["Angry Wigglers", "Blasta Mechakoopas", "Blooper Nannies", "Blue Spike Tops", "Boo Buddies", "Bowser Jr.", "Bowser", "Bull's-Eye Banzais", "Bumpers", "Burners", "Buzzy Beetles", "Buzzy Beetle Shells", "Cannons", "Chain Chomps", "Dry Bones Shells", "Fast Lava Lifts", "Fire Bars", "Fire Koopa Clown Cars", "Flimsy Lift", "Goombrats/Goombuds", "Grinders", "Iggy", "Koopa Clown Cars", "Lakitus", "Lakitu's Clouds", "Larry", "Lava Lifts", "Lemmy", "Lift", "Ludwig",  "Mechakoopas", "Monty Moles", "Morton", "Munchers", "One-Way Walls", "Red Cannons", "Red Spike Tops", "Red Koopa Troopas", "Rocky Wrenches", "Roy", "Seesaws", "Skewers", "Spiny Shells", "Swinging Claws", "Unchained Chomps", "Vines", "Wendy", "Wigglers", "Zappa Mechakoopas"];
var exclusives_day_ground = ["Poisonous Mushrooms"];
var exclusives_day = ["the Angry Sun"];
var exclusives_night = ["the Moon"];
var exclusives_tdw = ["! Blocks", "Ant Troopers", "Blinking Blocks", "Blue Piranha Creepers", "Blue Track Blocks", "Bullies", "Charvaarghs", "Cloud Lifts", "Crates", "Dash Blocks", "Fire Bros", "Heavy Fire Bros",  "Hop-Chops", "Horned Ant Troopers", "Key Boxes", "Koopa Troopa Cars", "Meowser", "Mushroom Trampoline", "ON/OFF Trampolines",  "Peepas", "Pink Piranha Creepers", "Pom Poms", "Porcupuffers", "Red POW Blocks", "Red Track Blocks", "Skipsqueaks", "Spike Blocks", "Spiny Skipsqueaks", "Stingbies", "Trees", "Warp Boxes" ];
var twists = ["make it vertical", "add a boss battle", "design a puzzle", "use a sub-world", "make it a speedrun", "add custom music", "make it non-linear", "add a clear condition", "don't allow jumping", "have a true ending", "focus on a powerup"];
var twists_movement = ["require spin-jumps"];

function reset() {
  if (!$('#styleLock').prop('checked')) style = null;
  if (!$('#themeLock').prop('checked')) theme = null;
  if (!$('#timeLock').prop('checked')) day = true;
  if (!$('#enemiesLock').prop('checked')) {
    item1 = null;
    item2 = null;
    item3 = null;
  }
}

function genStyle() {
  reset();
  if(!$('#styleLock').prop('checked')) {
    style = styles[Math.floor(Math.random() * styles.length)];
    /* style theme */
    for (var i = 0; i < exclusives_tdw.length; i++) {
      if (item1 == exclusives_tdw[i] || item2 == exclusives_tdw[i] || item3 == exclusives_tdw[i]) {
        style = "3DW";
        break;
      }
    }
    for (var i = 0; i < exclusives_not_tdw.length; i++) {
      if (item1 == exclusives_not_tdw[i] || item2 == exclusives_not_tdw[i] || item3 == exclusives_not_tdw[i] || !day) {
        var styles_without_3DW = ["SMB", "SMB3", "SMW", "NSMB"];
        style = styles_without_3DW[Math.floor(Math.random() * styles_without_3DW.length)];
        break;
      }
    }
    if(twist == "require spin-jumps") {
      var styles_movement = ["SMW", "NSMB", "3DW"];
      style = styles_movement[Math.floor(Math.random() * styles_movement.length)];
    }
  }
}

function genAll() {

  $('#generated').css('opacity', '0');
  $('.lds-roller').css('display', 'inline-block');

  genStyle();
  /* Theme */
  if (!$('#themeLock').prop('checked')) {
    theme = themes[Math.floor(Math.random() * themes.length)];
  }

  /* Day/Night */
  if (!$('#timeLock').prop('checked')) {
    if (theme != "Ghost House" && Math.floor(Math.random() * 10) < 8) {
      day = true;
    }
    else if (theme == "Ghost House" && Math.floor(Math.random() * 10) < 6) {
      day = true;
    }
    else {
      day = false;
    }
    if (item1 == "Moon" || item2 == "Moon" || item3 == "Moon" || item1 == "Poisonous Mushrooms" || item2 == "Poisonous Mushrooms" || item3 == "Poisonous Mushrooms") {
      day = false;
    }
    if (item1 == "the Angry Sun" || item2 == "the Angry Sun" || item3 == "the Angry Sun") {
      day = true;
    }
    if (style == "3DW") {
      day = true;
    }
  }
  /* Enemies/Gimmicks */
  if (!$('#enemiesLock').prop('checked')) {
    var list = common;
    if(style == "3DW") list = list.concat(exclusives_tdw);
    else list = list.concat(exclusives_not_tdw);
    if(theme == "Ground" && !day) list = list.concat(exclusives_day_ground);
    if(day && style != "3DW") list = list.concat(exclusives_day);
    else if(style != "3DW") list = list.concat(exclusives_night);

    var chosen = 0;
    var used = [null, null, null];
    while (chosen < 3) {
       var nextIndex = Math.floor(Math.random() * list.length);
       var usedYet = false;
       for (var k = 0; k < used.length; k++) {
         if(used[k] == nextIndex) usedYet = true;
       }
       if (!usedYet) {
         used[chosen] = nextIndex;
         chosen++;
       }
    }

    var htmlInsert = "";

    for (var i = 0; i < used.length; i++) {
      if (i == 0) item1 = list[used[i]];
      if (i == 1) item2 = list[used[i]];
      if (i == 2) item3 = list[used[i]];
      htmlInsert += list[used[i]];
      if(i != 2) htmlInsert += " & ";
    }

  }

  if (!$('#twistLock').prop('checked')) {
    var tempTwists = twists;
    if (style != "SMB" && style != "SMB3") tempTwists = tempTwists.concat(twists_movement);
    var tempTwist = tempTwists[Math.floor(Math.random() * tempTwists.length)];
    twist = tempTwist;
  }

// TOODO add delay 800 & 1000 from 0
  var delay = 800 + Math.random() * 1000;

  setTimeout(function(){
    $('#generated').css('opacity', '1');
    $('.lds-roller').css('display', 'none');
    update(htmlInsert, tempTwist);
  }, delay);
}

function update(enemies, twist) {
  if(!$('#styleLock').prop('checked')) $('#style').html('<img src=\"images/styles/' + style + '.png\" class=\"style\" alt=\"' + style + '\" title=\"' + style + '\">');
  if(!$('#themeLock').prop('checked')) $('#theme').html('<img src=\"images/themes/' + theme + '.png\" class=\"theme\" alt=\"' + theme + '\" title=\"' + theme + '\">');
  if (day) {
    $('#time').html("day");
  }
  else $('#time').html("night");
  if (!$('#enemiesLock').prop('checked')) $('#else').html(enemies);
  if (!$('#twistLock').prop('checked')) $('#twist').html(twist);
}
