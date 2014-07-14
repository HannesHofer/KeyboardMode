onKeydown = function(event) {
  if (event.ctrlKey && String.fromCharCode(event.keyCode) === "M") {
    LinkHints.activateMode();
  } else if (LinkHints.isActive) {
    if(16 > event.keyCode || event.keyCode > 18)
      LinkHints.onKeyDownInMode(LinkHints.hintMarkers, event)
    event.preventDefault();
    event.stopPropagation();
  } 
    
}

document.addEventListener("keydown", onKeydown, true);
settings.init();  