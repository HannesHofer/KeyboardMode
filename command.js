activateLinkHints = function() { LinkHints.activateMode();}
var metakey = {};
//activateLinkHints = function() { LinkHints.activateModeToOpenIncognito(); }

onKeydown = function(event) {
/*
 * THIS IS DONE BY CHROME KEYBINDING API NOW
   if ( (event.ctrlKey || !settings.get("ctrlKeyConfigured")) && 	// check for ctrl key if configured
       (event.altKey  || !settings.get("altKeyConfigured")) && 		// check for alt key if configured
       (event.shiftKey || !settings.get("shiftKeyConfigured")) && 	// check for shift key if configured
        String.fromCharCode(event.keyCode) == settings.get("linkHintKey").toUpperCase()) { // check for configured KeyCode
    activateLinkHints();
  } else */
  if (LinkHints.isActive) { 
    if(16 > event.keyCode || event.keyCode > 18) {
      // check for modifier Keys
      if (event.ctrlKey) metakey["strg"]();
      else if (event.altKey) metakey["alt"]();
      else if (event.shiftKey) metakey["shift"]();
      LinkHints.onKeyDownInMode(LinkHints.hintMarkers, event)
    }
    event.preventDefault();
    event.stopPropagation();
  }
}

/*************** load settings ***************/
loadHintChars(function(items) { settings.set("linkHintCharacters", items.hintchars);});
loadKeycombination(function(items) {
  settings.set("ctrlKeyConfigured", items.keycombStrg);
  settings.set("altKeyConfigured", items.keycombAlt);
  settings.set("shiftKeyConfigured", items.keycombShift);
  settings.set("linkHintKey", items.keycombKeycode);
});
loadLinkHintDefault(function(items) {
  //if (items.linkhintdefault === "follow") LinkHints.activateMode();
  if (items.linkhintdefault === "newtab") activateLinkHints = function() { LinkHints.activateModeToOpenInNewForegroundTab(); }
  else if (items.linkhintdefault === "newbacktab") activateLinkHints = function() { LinkHints.activateModeToOpenInNewTab(); }
  else if (items.linkhintdefault === "incognito") activateLinkHints = function() { LinkHints.activateModeToOpenIncognito(); }
  else if (items.linkhintdefault === "newwindow") activateLinkHints = function() { LinkHints.activateModeToOpenInNewWindow(); }
});

function getFunctionfromType(type) { 
  // return correct function for name
  if (type == "metakeyfollow") return function() { LinkHints.setMode(); };
  else if (type == "metakeynewtab") return function() { LinkHints.setModeToOpenInNewForegroundTab(); };
  else if (type == "metakeynewbacktab") return function() { LinkHints.setModeToOpenInNewTab(); };
  else if (type == "metakeyincognito") return function() { LinkHints.setModeToOpenIncognito(); };
  else if (type == "metakeynewwindow") return function() { LinkHints.setModeToOpenInNewWindow(); }; 
  
  return function(){};
}

loadLinkMetaKey(function(items) {
  // popultate with dummy functions
  metakey["strg"] = function(){};
  metakey["alt"] = function(){};
  metakey["shift"] = function(){};
  // map configured metakeys to functions
  for (var itemnr in items) {
    var item = itemnr.toLowerCase().replace("metakey","");
    item = items[itemnr].toLowerCase().replace(item, "");
    if (item == "strg" || item == "alt" || item == "shift")
      metakey[item] = getFunctionfromType(itemnr);
  }
     
});

/*************** load settings ***************/


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == 'open_link_hints') {
    activateLinkHints();
  }
});



settings.set("linkHintNumbers", "0123456789"); //TODO: do we need this?
document.addEventListener("keydown", onKeydown, true);
