onKeydown = function(event) {
  if (event.ctrlKey && String.fromCharCode(event.keyCode) === "M") {
    LinkHints.activateMode();
  } else if (LinkHints.isActive) {
    LinkHints.onKeyDownInMode(LinkHints.hintMarkers, event)
    event.preventDefault();
    event.stopPropagation();
  } 
    
}

settings = {
    values: {},
    get: function(key) {
      return this.values[key];
    },
    set: function(key, value) {
      this.values[key] = value;
    }
   
  };
  //settings.addEventListener("load", LinkHints.init.bind(LinkHints));
 settings.set("linkHintCharacters", "sadfjklewcmpgh");
 settings.set("linkHintNumbers", "0123456789");

 document.addEventListener("keydown", onKeydown, true);
