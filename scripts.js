$( document ).ready(function() {
  let tableHtmlString = "";
  tableHtmlString += "<table class='tableClass'>";
  tableHtmlString += "<tr class='trHeaderClass'><th width='60%'>Act</th><th width='20%'>To yourself</th><th width='20%'>To others</th></tr>";
  for(var i=0; i<jsonValues.length; i++){
    let actString = "<div data-act='" + jsonValues[i].ID + "'><div class='act-title'>" + jsonValues[i].Title + "</div><div>" + jsonValues[i].Description + "</div><input data-id='" + jsonValues[i].ID + "' class='additionalData' id=additionalData-" + jsonValues[i].ID + " placeholder='additional info'></input></div>";
    tableHtmlString += "<tr class='trInnerClass' data-act='" + jsonValues[i].ID + "'><td class='tdAct'>" + actString + "</td><td class='tdAction tdYourself'>" + getScores(i, "s") + "</td><td class='tdAction tdOthers'>" + getScores(i, "o") + "</td></tr>";
  }
  tableHtmlString += "</table>";
  $(".tablesContainer").html(tableHtmlString).promise().done(function(){
      let savedIds = localStorage.getItem("checklistIds") === null ? "" : localStorage.getItem("checklistIds");
      loadSavedIdsIntoDOM(savedIds);
  });


  /*---------------*/
  $(".save-button").on("click", function(){
    let allIds = getAllIds();
    download("checklist.txt",allIds);
  });

  $(".clear-button").on("click", function(){
    localStorage.removeItem("checklistIds");
  });

  $('input').change(function() {
    let allIds = getAllIds();
    localStorage.setItem("checklistIds", allIds);
  });

  $( "#csvCheckboxes" ).change(function() {
    readFile();
    //this.value = null;
  });

  function loadSavedIdsIntoDOM(savedIds){
    let allCheckboxes = document.querySelectorAll('input[type=checkbox]');
    for(var i=0; i<allCheckboxes.length; i++){
      allCheckboxes[i].checked = false;
    }
    if(savedIds != ""){
      savedIdsArray = savedIds.split("###");
      for(var i=0; i<savedIdsArray.length; i++){
        if(savedIdsArray[i] != ""){
          if(savedIdsArray[i].includes("|||")){
            //text
            savedTextArray = savedIdsArray[i].split("|||");
            document.getElementById("additionalData-" + savedTextArray[0]).setAttribute('value', savedTextArray[1]);
          }
          else{
            //id
            document.getElementById(savedIdsArray[i]).checked = true;
          }

        }
      }
    }
  }

  function getAllIds(){
    let allIds = "";
    let checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
    for(var i=0; i<checkedBoxes.length; i++){
      allIds += checkedBoxes[i].id + "###";
    }
    let additionalData = document.querySelectorAll('input.additionalData');
    for(var j=0; j<additionalData.length; j++){
      if(additionalData[j].value != "")
      allIds += additionalData[j].dataset.id + "|||" + additionalData[j].value + "###"
    }
    return allIds;
  }


  function readFile() {
    var file = document.getElementById("csvCheckboxes").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            csvString = evt.target.result;
            loadSavedIdsIntoDOM(csvString)
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
  }

});

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
//


function getScores(i, idAddon){
  return "<div class='scores'>" +
    "<div class='checkbox-wrapper checkbox-wrapper-1 is-done'>" +
      "<input type='checkbox' value='done' id='done-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='done-" + jsonValues[i].ID + "-" + idAddon+ "'>Done</label>" +
      "<input type='checkbox' value='not-done' id='not-done-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='not-done-" + jsonValues[i].ID + "-" + idAddon+ "'>Not Done</label>" +
    "</div>" +
    "<div class='checkbox-wrapper checkbox-wrapper-2 is-interesting'>" +
      "<input type='checkbox' value='essential' id='essential-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='essential-" + jsonValues[i].ID + "-" + idAddon+ "' >Essential</label>" +
      "<input type='checkbox' value='curious' id='curious-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='curious-" + jsonValues[i].ID + "-" + idAddon+ "'>Curious</label>" +
    "</div>" +
    "<div class='checkbox-wrapper checkbox-wrapper-4 limits'>" +
      "<input type='checkbox' value='soft-limit' id='soft-limit-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='soft-limit-" + jsonValues[i].ID + "-" + idAddon+ "'>Soft Limit</label>" +
      "<input type='checkbox' value='hard-limit' id='hard-limit-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='hard-limit-" + jsonValues[i].ID + "-" + idAddon+ "'>Hard Limit</label>" +
    "</div>" +
    "<div class='checkbox-wrapper checkbox-wrapper-3 score'>" +
      "<div class='scoreWrapper'>" +
        "<input type='checkbox' value='1' id='score-1-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='score-1-" + jsonValues[i].ID + "-" + idAddon+ "'>1</label>" +
        "<input type='checkbox' value='2' id='score-2-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='score-2-" + jsonValues[i].ID + "-" + idAddon+ "'>2</label>" +
        "<input type='checkbox' value='3' id='score-3-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='score-3-" + jsonValues[i].ID + "-" + idAddon+ "'>3</label>" +
        "<input type='checkbox' value='4' id='score-4-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='score-4-" + jsonValues[i].ID + "-" + idAddon+ "'>4</label>" +
        "<input type='checkbox' value='5' id='score-5-" + jsonValues[i].ID + "-" + idAddon+ "' /><label for='score-5-" + jsonValues[i].ID + "-" + idAddon+ "'>5</label>" +
        "</div>" +
    "</div>" +
  "</div>";
}


let jsonValues = [
  {
    "ID": "0",
    "Title": "Anal Play",
    "Description": "Acts in which the anus is involved."
  },
  {
    "ID": "1",
    "Title": "Beating (General)",
    "Description": "Acts in which one partner is beaten."
  },
  {
    "ID": "2",
    "Title": "Beating - Canes",
    "Description": "Acts in which one partner is beaten with a cane."
  },
  {
    "ID": "3",
    "Title": "Beating - Crops",
    "Description": "Acts in which one partner is beaten with a crop."
  },
  {
    "ID": "4",
    "Title": "Beating - Floggers",
    "Description": "Acts in which one partner is beaten with a flogger."
  },
  {
    "ID": "5",
    "Title": "Beating - Hairbrushes",
    "Description": "Acts in which one partner is beaten with a hairbrush."
  },
  {
    "ID": "6",
    "Title": "Beating - Hard",
    "Description": "Acts in which one partner is beaten hard."
  },
  {
    "ID": "7",
    "Title": "Beating - Paddles",
    "Description": "Acts in which one partner is beaten with a paddle."
  },
  {
    "ID": "8",
    "Title": "Beating - Soft",
    "Description": "Acts in which one partner is beaten softly."
  },
  {
    "ID": "9",
    "Title": "Beating - Spanking",
    "Description": "Acts in which one partner is beaten with a hand."
  },
  {
    "ID": "10",
    "Title": "Beating - Straps",
    "Description": "Acts in which one partner is beaten with a strap."
  },
  {
    "ID": "11",
    "Title": "Beating - Whips",
    "Description": "Acts in which one partner is beaten with a whip."
  },
  {
    "ID": "12",
    "Title": "Beating Location - Back",
    "Description": "Beating based acts that focus on the back as a target."
  },
  {
    "ID": "13",
    "Title": "Beating Location - Bottom",
    "Description": "Beating based acts that focus on the bottom as a target."
  },
  {
    "ID": "14",
    "Title": "Beating Location - Chest",
    "Description": "Beating based acts that focus on the chest or breasts as a target."
  },
  {
    "ID": "15",
    "Title": "Beating Location - Feet",
    "Description": "Beating based acts that focus on the feet (usually the soles) as a target."
  },
  {
    "ID": "16",
    "Title": "Beating Location - Genitals",
    "Description": "Beating based acts that focus on the genitals as a target."
  },
  {
    "ID": "17",
    "Title": "Beating Location - Legs",
    "Description": "Beating based acts that focus on the legs as a target."
  },
  {
    "ID": "18",
    "Title": "Bestiality",
    "Description": "Sex with animals."
  },
  {
    "ID": "19",
    "Title": "Biting",
    "Description": "Acts involving biting one partner with the teeth of the other."
  },
  {
    "ID": "20",
    "Title": "Blindfolds",
    "Description": "Acts in which blindfolds are placed over one partner's eyes to remove that sense (and often heighten others)."
  },
  {
    "ID": "21",
    "Title": "Body Modification - Branding",
    "Description": "Burning the body, often with a specific design, to leave a permanent mark or scar."
  },
  {
    "ID": "22",
    "Title": "Body Modification - Piercing, Permanent",
    "Description": "Putting an object through a part of the body for permanent adornment."
  },
  {
    "ID": "23",
    "Title": "Body Modification - Piercing, Play",
    "Description": "Exploring the concept of body piercing but in a manner that is temporary."
  },
  {
    "ID": "24",
    "Title": "Body Modification - Saline Injection",
    "Description": "Injecting saline in to a part of the body to temporarily engorge it."
  },
  {
    "ID": "25",
    "Title": "Body Modification - Scarification",
    "Description": "Deliberately causing scars, often through cutting the skin, for adornment."
  },
  {
    "ID": "26",
    "Title": "Body Modification - Tattooing",
    "Description": "Adorning the body by permanently applying ink under the skin."
  },
  {
    "ID": "27",
    "Title": "Bondage (General)",
    "Description": "Binding or restricting some or all of the body."
  },
  {
    "ID": "28",
    "Title": "Bondage - Breast",
    "Description": "Binding or restricting the breasts."
  },
  {
    "ID": "29",
    "Title": "Bondage - Cuffs",
    "Description": "Binding or restricting the body (usually the wrists) with [hand]cuffs."
  },
  {
    "ID": "30",
    "Title": "Bondage - Genital",
    "Description": "Binding or restricting the genitals."
  },
  {
    "ID": "31",
    "Title": "Bondage - Heavy",
    "Description": "Heavily binding or restricting the body, usually to the point where no, or next-to no, movement is possible."
  },
  {
    "ID": "32",
    "Title": "Bondage - Intricate",
    "Description": "Intricately binding or restricting some or all of the body."
  },
  {
    "ID": "33",
    "Title": "Bondage - Light",
    "Description": "Lightly binding or restricting the body. Usually more symbolic than actually restrictive."
  },
  {
    "ID": "34",
    "Title": "Bondage - Locks",
    "Description": "Bondage that involves locks and keys."
  },
  {
    "ID": "35",
    "Title": "Bondage - Prolonged",
    "Description": "Binding or restricting some or all of the body for prolonged periods of time."
  },
  {
    "ID": "36",
    "Title": "Bondage - Sleeves, Arm",
    "Description": "Restricting the movement of the arms by placing them in a confining sleeve."
  },
  {
    "ID": "37",
    "Title": "Bondage - Sleeves, Leg",
    "Description": "Restricting the movement of the legs by placing them in a confining sleeve."
  },
  {
    "ID": "38",
    "Title": "Bondage - Spreader Bars",
    "Description": "Restricting the movement of the legs by connecting them to either end of a bar, usually forcing them open."
  },
  {
    "ID": "39",
    "Title": "Bondage - Stocks",
    "Description": "Restricing movement by placing the wrists and neck (though may involve ankles) through a set of stocks."
  },
  {
    "ID": "40",
    "Title": "Bondage - Strait Jackets",
    "Description": "Binding or restricting the torso and arms by placing them inside a straight jacket."
  },
  {
    "ID": "41",
    "Title": "Bondage - Suspension",
    "Description": "Binding or restricting someone so they are suspended above the ground."
  },
  {
    "ID": "42",
    "Title": "Bondage - Suspension, Inverted",
    "Description": "Binding or restricting someone so they are suspended above the ground, upside-down."
  },
  {
    "ID": "43",
    "Title": "Bondage - Whole Body",
    "Description": "Binding or restricting the whole body."
  },
  {
    "ID": "44",
    "Title": "Bondage Material - Chain",
    "Description": "Binding or restricting the body, or parts of, with chain."
  },
  {
    "ID": "45",
    "Title": "Bondage Material - Leather",
    "Description": "Binding or restricting the body, or parts of, with leather."
  },
  {
    "ID": "46",
    "Title": "Bondage Material - Rope",
    "Description": "Binding or restricting the body, or parts of, with rope."
  },
  {
    "ID": "47",
    "Title": "Bondage Material - Saran Wrap",
    "Description": "Binding or restricting the body, or parts of, with saran wrap (clingfilm)."
  },
  {
    "ID": "48",
    "Title": "Bondage Material - Scarves",
    "Description": "Binding or restricting the body, or parts of, with [usually silk] scarves."
  },
  {
    "ID": "49",
    "Title": "Bondage Material - Tape",
    "Description": "Binding or restricting the body, or parts of, with [usually adhesive] tape."
  },
  {
    "ID": "50",
    "Title": "Breath Play",
    "Description": "Also called Asphyxiation. Acts involving restricting or cutting off the supply of oxygen."
  },
  {
    "ID": "51",
    "Title": "Catheters",
    "Description": "Inserting a tube in to the urethra to collect urine."
  },
  {
    "ID": "52",
    "Title": "Clothespins",
    "Description": "Using clothespins to pinch parts of the body."
  },
  {
    "ID": "53",
    "Title": "Clothing - Chosen For",
    "Description": "Having your clothing choices made for you, usually without the ability to appeal."
  },
  {
    "ID": "54",
    "Title": "Clothing - Corsets",
    "Description": "Wearing corsets which control the shape of the waist and hips."
  },
  {
    "ID": "55",
    "Title": "Clothing - Full Head Hoods",
    "Description": "Wearing hoods that cover the entire head, leaving only small holes for vision, breathing, etc. (if even them)."
  },
  {
    "ID": "56",
    "Title": "Clothing - Harnesses",
    "Description": "Wearing clothing that harnesses the body without necessarily covering it."
  },
  {
    "ID": "57",
    "Title": "Clothing - High Heels",
    "Description": "Wearing high-heeled shoes."
  },
  {
    "ID": "58",
    "Title": "Clothing - Lingerie",
    "Description": "Wearing women's lingerie."
  },
  {
    "ID": "59",
    "Title": "Clothing - Masks",
    "Description": "Wearing masks that cover the face."
  },
  {
    "ID": "60",
    "Title": "Clothing - Uniforms (General)",
    "Description": "Wearing uniforms that have a given significance."
  },
  {
    "ID": "61",
    "Title": "Clothing - Uniforms, Military",
    "Description": "Wearing military uniforms."
  },
  {
    "ID": "62",
    "Title": "Clothing - Uniforms, School",
    "Description": "Wearing schoolgirl/schoolboy uniforms."
  },
  {
    "ID": "63",
    "Title": "Clothing Material - Leather",
    "Description": "Clothing made out of, or involving, leather."
  },
  {
    "ID": "64",
    "Title": "Clothing Material - PVC",
    "Description": "Clothing made out of, or involving, PVC (the shiny plasticy material)."
  },
  {
    "ID": "65",
    "Title": "Clothing Material - Rubber",
    "Description": "Clothing made out of, or involving, rubber or latex."
  },
  {
    "ID": "66",
    "Title": "Clothing Material - Sheer",
    "Description": "Clothing made out of, or involving, sheer (transparent or translucent) material."
  },
  {
    "ID": "67",
    "Title": "Collars - Private",
    "Description": "Wearing a \"slave\" collar in private."
  },
  {
    "ID": "68",
    "Title": "Collars - Public",
    "Description": "Wearing a \"slave\" collar in public."
  },
  {
    "ID": "69",
    "Title": "Crawling",
    "Description": "The act of crawling on all fours to denote submission."
  },
  {
    "ID": "70",
    "Title": "Cutting",
    "Description": "Deliberately cutting the skin."
  },
  {
    "ID": "71",
    "Title": "Dilation - Anal",
    "Description": "Deliberately stretching the anus open."
  },
  {
    "ID": "72",
    "Title": "Dilation - Vaginal",
    "Description": "Deliberately stretching the vagina open."
  },
  {
    "ID": "73",
    "Title": "Discipline",
    "Description": "Submitting to, or receiving, the [often corporal] discipline of another."
  },
  {
    "ID": "74",
    "Title": "Drinking - Blood",
    "Description": "Drinking blood."
  },
  {
    "ID": "75",
    "Title": "Drinking - Semen",
    "Description": "Drinking semen."
  },
  {
    "ID": "76",
    "Title": "Drinking - Urine",
    "Description": "Drinking urine."
  },
  {
    "ID": "77",
    "Title": "Electricity",
    "Description": "Using electricity for sensation or pain."
  },
  {
    "ID": "78",
    "Title": "Enemas",
    "Description": "Applying liquid (traditionally warm water) in to the lower intestine, via a tube. Often to induce uncontrolled, or hard to control, excretion."
  },
  {
    "ID": "79",
    "Title": "Examination - Physical",
    "Description": "Having your body physically examined and, often, appraised. Sometimes this includes medical examination roleplays though, here, that is listed as Roleplay - Medical."
  },
  {
    "ID": "80",
    "Title": "Exhibitionism - Forced",
    "Description": "Exposing your body to others, nominally against your will, at the will of another."
  },
  {
    "ID": "81",
    "Title": "Exhibitionism - Voluntary",
    "Description": "Willingly exposing your body to others."
  },
  {
    "ID": "82",
    "Title": "Face Slapping",
    "Description": "Slapping the face, usually with an open hand, to cause pain or denote position."
  },
  {
    "ID": "83",
    "Title": "Fisting - Anal",
    "Description": "Placing an entire hand (the term \"fist\" is often an exageration) inside the anus."
  },
  {
    "ID": "84",
    "Title": "Fisting - Vaginal",
    "Description": "Placing an entire hand (the term \"fist\" is often an exageration) inside the vagina."
  },
  {
    "ID": "85",
    "Title": "Food - Chosen For",
    "Description": "Having your food choices made for you, usually without the ability to appeal."
  },
  {
    "ID": "86",
    "Title": "Food - From Body",
    "Description": "Eating food from another person's body. Either eating it directly from them or using them as a platter."
  },
  {
    "ID": "87",
    "Title": "Food - From Bowl",
    "Description": "Eating food directly from a bowl, like an animal such as a cat or dog."
  },
  {
    "ID": "88",
    "Title": "Food - From Hand",
    "Description": "Eating food directly from another person's hand."
  },
  {
    "ID": "89",
    "Title": "Gags (General)",
    "Description": "Devices used to limit, or prevent, verbal communication."
  },
  {
    "ID": "90",
    "Title": "Gags - Ball",
    "Description": "A type of gag that uses a ball to effectively block any verbal communication."
  },
  {
    "ID": "91",
    "Title": "Gags - Bit",
    "Description": "A type of gag that uses a bar that goes across the mouth, much like a horse's \"bit\"."
  },
  {
    "ID": "92",
    "Title": "Gags - Ring",
    "Description": "A type of gag that uses a ring to force the mouth open while providing access to the, now undefendable, mouth."
  },
  {
    "ID": "93",
    "Title": "Gags - Tape",
    "Description": "Using adhesive tape across the mouth to create a gag."
  },
  {
    "ID": "94",
    "Title": "Given Away (General)",
    "Description": "Being given, at a partner's whim, to another person, usually temporarily."
  },
  {
    "ID": "95",
    "Title": "Given Away - Auctions",
    "Description": "Being given to another person as the result of a [slave] auction."
  },
  {
    "ID": "96",
    "Title": "Given Away - Permanent",
    "Description": "Being given away, at a partner's whim, to another person, permanently."
  },
  {
    "ID": "97",
    "Title": "Hand Jobs",
    "Description": "Pleasuring someone else's genitals with your hand."
  },
  {
    "ID": "98",
    "Title": "Heterosexuality - Forced",
    "Description": "Sexual acts with members of the opposite sex, nominally against your will."
  },
  {
    "ID": "99",
    "Title": "Heterosexuality - Voluntary",
    "Description": "Sexual acts with members of the opposite sex, willingly."
  },
  {
    "ID": "100",
    "Title": "Homosexuality - Forced",
    "Description": "Sexual acts with members of the same sex, nominally against your will."
  },
  {
    "ID": "101",
    "Title": "Homosexuality - Voluntary",
    "Description": "Sexual acts with members of the same sex, willingly."
  },
  {
    "ID": "102",
    "Title": "Humiliation - Private",
    "Description": "Acts in which you are humiliated, degrated, or shamed, in a private setting."
  },
  {
    "ID": "103",
    "Title": "Humiliation - Public",
    "Description": "Acts in which you are humiliated, degrated, or shamed, in front of others."
  },
  {
    "ID": "104",
    "Title": "Humiliation - Verbal",
    "Description": "Acts in which you are humiliated, degrated, or shamed, through either the words of someone else (such as name calling) or your own words."
  },
  {
    "ID": "105",
    "Title": "Including Others",
    "Description": "Acts in which other people, from outside your immediate relationship, are included."
  },
  {
    "ID": "106",
    "Title": "Kneeling",
    "Description": "The act of kneeling to denote submission."
  },
  {
    "ID": "107",
    "Title": "Leashes",
    "Description": "Wearing a leash, attached to a collar (or other convenient point)."
  },
  {
    "ID": "108",
    "Title": "Lecturing",
    "Description": "An exposition of a given subject for the purpose of instruction or reprimand."
  },
  {
    "ID": "109",
    "Title": "Licking",
    "Description": "Using your tongue on another person's body [or, often, anything they require]."
  },
  {
    "ID": "110",
    "Title": "Massage",
    "Description": "Rubbing another person's body for their relaxation."
  },
  {
    "ID": "111",
    "Title": "Masturbation - Forced",
    "Description": "Pleasuring your own genitals, with your hand, nominally against your will."
  },
  {
    "ID": "112",
    "Title": "Masturbation - Voluntary",
    "Description": "Pleasuring your own genitals, with your hand, willingly."
  },
  {
    "ID": "113",
    "Title": "Nipple Clamps",
    "Description": "Placing clamps on the nipples to cause pain."
  },
  {
    "ID": "114",
    "Title": "Nipple Play",
    "Description": "Acts that focus on the nipples."
  },
  {
    "ID": "115",
    "Title": "Nipple Weights",
    "Description": "Applying weights to the nipples to stretch them, generally to cause pain."
  },
  {
    "ID": "116",
    "Title": "Nudity - Forced",
    "Description": "Periods of time spent without clothing, nominally against you will."
  },
  {
    "ID": "117",
    "Title": "Nudity - Voluntary",
    "Description": "Periods of time spent without clothing."
  },
  {
    "ID": "118",
    "Title": "Orgasm - On Command",
    "Description": "Having to orgasm on the command of another person."
  },
  {
    "ID": "119",
    "Title": "Orgasm Control",
    "Description": "Giving control of when and how orgasms are experienced - and when they are not - to another person."
  },
  {
    "ID": "120",
    "Title": "Orgasm Denial",
    "Description": "Losing the right to have orgasms for an [often protracted] period of time."
  },
  {
    "ID": "121",
    "Title": "Pain (General)",
    "Description": "Acts involving physical pain."
  },
  {
    "ID": "122",
    "Title": "Pain - Heavy",
    "Description": "Acts involving a very large degree of physical pain."
  },
  {
    "ID": "123",
    "Title": "Pain - Light",
    "Description": "Acts involving some physical pain, yet without too great an intensity - being more symbolic than serious."
  },
  {
    "ID": "124",
    "Title": "Phone Sex",
    "Description": "Having sexually explicit phone conversations, usually involving performing sexual acts at the same time."
  },
  {
    "ID": "125",
    "Title": "Rape - Fantasy",
    "Description": "Acts that explore being sexually used, nominally against your will, by another person."
  },
  {
    "ID": "126",
    "Title": "Rape - Fantasy, Gang",
    "Description": "Acts that explore being sexually used, nominally against your will, by more than one other person."
  },
  {
    "ID": "127",
    "Title": "Recorded Scenes - Photographs, Private",
    "Description": "Having photographs taken of you, either naked or indulging in a sexual act, for private viewing only."
  },
  {
    "ID": "128",
    "Title": "Recorded Scenes - Photographs, Shared",
    "Description": "Having photographs taken of you, either naked or indulging in a sexual act, to be shared with others."
  },
  {
    "ID": "129",
    "Title": "Recorded Scenes - Video, Private",
    "Description": "Having video taken of you, either naked or indulging in a sexual act, for private viewing only."
  },
  {
    "ID": "130",
    "Title": "Recorded Scenes - Video, Shared",
    "Description": "Having video taken of you, either naked or indulging in a sexual act, to be shared with others."
  },
  {
    "ID": "131",
    "Title": "Roleplay (General)",
    "Description": "Scenes in which the participants take on and act out roles."
  },
  {
    "ID": "132",
    "Title": "Roleplay - Age",
    "Description": "Scenes in which the participants take on and act out roles based on being a different age (such as babies or naughty young girls)."
  },
  {
    "ID": "133",
    "Title": "Roleplay - Education",
    "Description": "Scenes in which the participants take on and act out roles based on a scholastic teacher/student setting."
  },
  {
    "ID": "134",
    "Title": "Roleplay - Interrogation",
    "Description": "Scenes in which the participants take on and act out roles based on interrogations where one person is the interrogator and the other the subject."
  },
  {
    "ID": "135",
    "Title": "Roleplay - Kidnapping",
    "Description": "Scenes in which the participants take on and act out roles based on one partner being kidnapped."
  },
  {
    "ID": "136",
    "Title": "Roleplay - Medical",
    "Description": "Scenes in which the participants take on and act out roles such as Doctor/Patient."
  },
  {
    "ID": "137",
    "Title": "Roleplay - Pig",
    "Description": "Scenes in which the subject takes on and acts out a role based on being a pig."
  },
  {
    "ID": "138",
    "Title": "Roleplay - Pony",
    "Description": "Scenes in which the subject takes on and acts out a role based on being a pony."
  },
  {
    "ID": "139",
    "Title": "Roleplay - Prison",
    "Description": "Scenes in which the participants take on and act out roles based on the prison world such as Sadistic Jailer/Vulnerable Inmate"
  },
  {
    "ID": "140",
    "Title": "Roleplay - Puppy",
    "Description": "Scenes in which the subject takes on and acts out a role based on being a puppy or adult dog."
  },
  {
    "ID": "141",
    "Title": "Roleplay - Religious",
    "Description": "Scenes in which the participants take on and act out roles based on the religious world such as confessionals or Bishop/Nun."
  },
  {
    "ID": "142",
    "Title": "Roleplay - Whore",
    "Description": "Scenes in which the subject takes on and acts out a role based on being a male or female prostitute, selling themselves to another person for sex."
  },
  {
    "ID": "143",
    "Title": "Sensation Play (General)",
    "Description": "Acts involving the senses and strong sensations."
  },
  {
    "ID": "144",
    "Title": "Sensation Play - Deprivation",
    "Description": "Acts involving depriving the subject of their senses (often to heighten the remaining ones)."
  },
  {
    "ID": "145",
    "Title": "Sensation Play - Fire",
    "Description": "Acts involving the sensations and apprehensions caused by fire and heat."
  },
  {
    "ID": "146",
    "Title": "Sensation Play - Hair Pulling",
    "Description": "Acts involving the sensations and apprehensions caused by having hair pulled."
  },
  {
    "ID": "147",
    "Title": "Sensation Play - Hot Wax",
    "Description": "Acts involving the sensations and apprehensions caused by having hot candle wax dripped on to or applied to the body."
  },
  {
    "ID": "148",
    "Title": "Sensation Play - Ice",
    "Description": "Acts involving the sensations and apprehensions caused by using ice or other cold items on the body."
  },
  {
    "ID": "149",
    "Title": "Sensation Play - Needle",
    "Description": "Acts involving the sensations and apprehensions caused by using needles on the body, either scratching with them, or poking them."
  },
  {
    "ID": "150",
    "Title": "Sensation Play - Scratching",
    "Description": "Acts involving the sensations and apprehensions caused by being scratched."
  },
  {
    "ID": "151",
    "Title": "Sensation Play - Suction",
    "Description": "Acts involving the sensations and apprehensions caused by having suction applied to the body."
  },
  {
    "ID": "152",
    "Title": "Sensation Play - Teasing",
    "Description": "Acts involving the sensations and apprehensions caused by teasing the body."
  },
  {
    "ID": "153",
    "Title": "Sensation Play - Tickling",
    "Description": "Acts involving the sensations and apprehensions caused by tickling the body."
  },
  {
    "ID": "154",
    "Title": "Serving (General)",
    "Description": "Serving another person in specific ways, putting their pleasure ahead of your own. For example, a maid or a sexual servant."
  },
  {
    "ID": "155",
    "Title": "Serving - Art",
    "Description": "Serving another person, putting their pleasure ahead of your own, as a (usually immobile) piece of artwork such as a statue."
  },
  {
    "ID": "156",
    "Title": "Serving - Ashtray",
    "Description": "Serving another person, putting their pleasure ahead of your own, using a part of your body as a receptacle for their cigarette or cigar ash."
  },
  {
    "ID": "157",
    "Title": "Serving - Chauffer",
    "Description": "Serving another person, putting their pleasure ahead of your own, as their formal driver."
  },
  {
    "ID": "158",
    "Title": "Serving - Dancer",
    "Description": "Serving another person, putting their pleasure ahead of your own, as a dancer. For example, a belly dancer or stripper."
  },
  {
    "ID": "159",
    "Title": "Serving - Following Orders",
    "Description": "Serving another person, putting their pleasure ahead of your own, as they give you specific formal orders to follow."
  },
  {
    "ID": "160",
    "Title": "Serving - Forced",
    "Description": "Serving another person in specific ways, putting their pleasure ahead of your own, nominally forced against your will."
  },
  {
    "ID": "161",
    "Title": "Serving - Furniture",
    "Description": "Serving another person, putting their pleasure ahead of your own, as an immobile piece of furniture. For example, on all fours as a table or a footstool."
  },
  {
    "ID": "162",
    "Title": "Serving - Housework",
    "Description": "Serving another person, putting their pleasure ahead of your own, performing household chores."
  },
  {
    "ID": "163",
    "Title": "Serving - Maid",
    "Description": "Serving another person, putting their pleasure ahead of your own, as a maid. For example, serving tea while wearing a uniform."
  },
  {
    "ID": "164",
    "Title": "Serving - Sexually",
    "Description": "Serving another person, putting their pleasure ahead of your own, in whatever sexual way pleases them."
  },
  {
    "ID": "165",
    "Title": "Sex - Anal",
    "Description": "Sexual intercourse involving a penis entering your anus."
  },
  {
    "ID": "166",
    "Title": "Sex - Cunnilingus",
    "Description": "Sexually stimulating the vagina with a mouth/tongue."
  },
  {
    "ID": "167",
    "Title": "Sex - Denial",
    "Description": "Going without sex, or sexual gratification, often at another person's command."
  },
  {
    "ID": "168",
    "Title": "Sex - Fellatio",
    "Description": "Sexually stimulating the penis with a mouth/tongue."
  },
  {
    "ID": "169",
    "Title": "Sex - Group",
    "Description": "Sexual intercourse with more than one partner."
  },
  {
    "ID": "170",
    "Title": "Sex - Penetration, Double",
    "Description": "Sexual intercourse in which two orrifices (mouth, vagina, anus) are filled."
  },
  {
    "ID": "171",
    "Title": "Sex - Penetration, Triple",
    "Description": "Sexual intercourse in which three orrifices (mouth, vagina, anus) are filled."
  },
  {
    "ID": "172",
    "Title": "Sex - Rimming",
    "Description": "Sexually stimulating the anus with a mouth/tongue."
  },
  {
    "ID": "173",
    "Title": "Sex - Threesome",
    "Description": "Sexual intercourse with two other people."
  },
  {
    "ID": "174",
    "Title": "Sex - Vaginal",
    "Description": "Sexual intercourse involving a penis entering your vagina."
  },
  {
    "ID": "175",
    "Title": "Sex - Vanilla",
    "Description": "Traditional sexual intercourse, without involving any kinks."
  },
  {
    "ID": "176",
    "Title": "Sex Toys - Beads",
    "Description": "Having a string of connected beads (or balls) inserted in to your anus or vagina and then pulled out."
  },
  {
    "ID": "177",
    "Title": "Sex Toys - Butt Plugs",
    "Description": "Wearing a \"plug\" inserted in to your anus."
  },
  {
    "ID": "178",
    "Title": "Sex Toys - Dildos",
    "Description": "Using and/or being penetrated with a non-vibrating artificial phallus."
  },
  {
    "ID": "179",
    "Title": "Sex Toys - Eggs",
    "Description": "Variously known as Ben-Wa Balls, Love Eggs, etc. Two balls made to be vaginally inserted which vibrate when you move or are battery powered to vibrate."
  },
  {
    "ID": "180",
    "Title": "Sex Toys - Public (Under Clothes)",
    "Description": "Going out in public with a sex toy (such as a butt plug) in your body, under your clothing."
  },
  {
    "ID": "181",
    "Title": "Sex Toys - Strap On",
    "Description": "Using and/or being penetrated with an artificial phallus that fastens about a partner's waist."
  },
  {
    "ID": "182",
    "Title": "Sex Toys - Vibrators",
    "Description": "Using and/or being penetrated with a vibrating toy, usually an artificial phallus."
  },
  {
    "ID": "183",
    "Title": "Shaving - Body",
    "Description": "Removing all traces of hair below the neck."
  },
  {
    "ID": "184",
    "Title": "Shaving - Genital",
    "Description": "Removing all traces of hair from the genitals."
  },
  {
    "ID": "185",
    "Title": "Shaving - Genital, Styling",
    "Description": "Shaving or trimming pubic hair, removing some but not all of it in a given style."
  },
  {
    "ID": "186",
    "Title": "Shaving - Head",
    "Description": "Removing all traces of hair from the head."
  },
  {
    "ID": "187",
    "Title": "Showers - Brown",
    "Description": "Defecating on another person."
  },
  {
    "ID": "188",
    "Title": "Showers - Golden",
    "Description": "Urinating on another person."
  },
  {
    "ID": "189",
    "Title": "Speculums - Anal",
    "Description": "Using a medical tool to dilate (stretch open) the entrance to the anus, providing access within."
  },
  {
    "ID": "190",
    "Title": "Speculums - Vaginal",
    "Description": "Using a medical tool to dilate (stretch open) the entrance to the vagina, providing access within."
  },
  {
    "ID": "191",
    "Title": "Swapping (Partner)",
    "Description": "Sex between two or more couples where members of each couple exchange partners and have sex with them."
  },
  {
    "ID": "192",
    "Title": "Voyeurism",
    "Description": "Watching someone, often without their knowledge, in a situation with sexual connotations."
  },
  {
    "ID": "193",
    "Title": "Worship - Boot",
    "Description": "Worshiping the boots of another person."
  },
  {
    "ID": "194",
    "Title": "Worship - Bottom",
    "Description": "Worshiping the bottom of another person."
  },
  {
    "ID": "195",
    "Title": "Worship - Breast",
    "Description": "Worshiping the breasts of another person."
  },
  {
    "ID": "196",
    "Title": "Worship - Foot",
    "Description": "Worshiping the feet of another person."
  },
  {
    "ID": "197",
    "Title": "Worship - Genital",
    "Description": "Worshiping the genitals of another person."
  },
  {
    "ID": "198",
    "Title": "Worship - High Heel",
    "Description": "Worshiping the high-heeled shoes of another person."
  },
  {
    "ID": "199",
    "Title": "Wrestling",
    "Description": "Wrestling with another person, overpowering them or being overpowered."
  },
];
