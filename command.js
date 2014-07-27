activateLinkHints = function() { LinkHints.activateMode();}
//activateLinkHints = function() { LinkHints.activateModeToOpenIncognito(); }

onKeydown = function(event) {
  console.log("porgo1: " + String.fromCharCode(event.keyCode) + "!" );
  console.log("porgo2: " + settings.get("linkHintKey").toUpperCase() + "!" );
  
  if (event.ctrlKey && String.fromCharCode(event.keyCode) == settings.get("linkHintKey").toUpperCase()) {
    activateLinkHints();
  } else if (LinkHints.isActive) {
    if(16 > event.keyCode || event.keyCode > 18)
      LinkHints.onKeyDownInMode(LinkHints.hintMarkers, event)
    event.preventDefault();
    event.stopPropagation();
  }
}
loadHintChars(function(items) { settings.set("linkHintCharacters", items.hintchars);});
loadKeycombination(function(items) {
  settings.set("ctrlKeyConfigured", items.keycombStrg);
  settings.set("altKeyConfigured", items.keycombAlt);
  settings.set("shiftKeyConfigured", items.keycombShift);
  settings.set("linkHintKey", items.keycombKeycode);
});
loadLinkHintDefault(function(items) {
  //TODO do this with MAP and SWITCH?
  //if (items.linkhintdefault === "follow") LinkHints.activateMode();
  if (items.linkhintdefault === "newtab") activateLinkHints = function() { LinkHints.activateModeToOpenInNewForegroundTab(); }
  else if (items.linkhintdefault === "newbacktab") activateLinkHints = function() { LinkHints.activateModeToOpenInNewTab(); }
  else if (items.linkhintdefault === "incognito") activateLinkHints = function() { LinkHints.activateModeToOpenIncognito(); }
  //else if (items.linkhintdefault === "backincognito") LinkHints.
});

settings.set("linkHintNumbers", "0123456789"); //TODO: do we need this?
document.addEventListener("keydown", onKeydown, true);