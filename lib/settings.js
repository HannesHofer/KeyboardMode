 
function loadLinkHintDefault (func) {
    chrome.storage.sync.get({
    linkhintdefault: 'follow'
  }, func)
}

function loadHintChars(func) {
  chrome.storage.sync.get({
    hintchars: 'sadfjklewcmpgh'
  }, func)
}

function loadKeycombination(func) {
  var strg, alt, shift, key;
  chrome.storage.sync.get({
    keycombStrg: true,
    keycombAlt: false,
    keycombShift: false,
    keycombKeycode: 'M'
  }, func);
}

function loadLinkMetaKey(func) {
  chrome.storage.sync.get({
    metakeyfollow: "",
    metakeynewtab: "",
    metakeynewbacktab: "",
    metakeyincognito: "",
    metakeybackincognito: ""
  }, func);  
}

settings = {
    values : {},
    keycombAlt : false,
    keycombStrg : false,
    keycombShift : false,
    keycombKeycode : '',
    
    get: function(key) {
      return this.values[key];
    },
    set: function(key, value) {
      this.values[key] = value;
    },
    init: function() {
      // load keycomination
      loadKeycombination(function(items) {
	this.keycombAlt = items.keycombAlt;
	this.keycombShift = items.keycombShift;
	this.keycombStrg = items.keycombStrg;
	this.keycombKeycode = items.keycombKeycode;
      });
      
      // loadCharHints
      loadHintChars(function(items) {
	settings.set("linkHintCharacters", "sadfjklewcmpgh");
	settings.set("linkHintNumbers", "0123456789"); //TODO: do we need this?
      });
    }
  };

  