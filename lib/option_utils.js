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

function storeKeycombination() {
  var strg, alt, shift, key;
  chrome.storage.sync.set({
    keycombStrg: document.getElementById('keycombStrg').checked,
    keycombAlt: document.getElementById('keycombAlt').checked,
    keycombShift: document.getElementById('keycombShift').checked,
    keycombKeycode: document.getElementById('keycombKeycode').value
  }, null);
}

function storeLinkHintDefault() {
  chrome.storage.sync.set({
    linkhintdefault: document.querySelector('input[name = "defaultmode"]:checked').value
  }, null);
}

function storeLinkMetaKey() {
  chrome.storage.sync.set({
    metakeyfollow: document.querySelector('input[name = "follow"]:checked').id,
    metakeynewtab: document.querySelector('input[name = "newtab"]:checked').id,
    metakeynewbacktab: document.querySelector('input[name = "newbacktab"]:checked').id,
    metakeyincognito: document.querySelector('input[name = "incognito"]:checked').id,
    metakeybackincognito: document.querySelector('input[name = "backincognito"]:checked').id
  }, null);
}


function storeHintChars() {
  chrome.storage.sync.set({
    hintchars: document.getElementById('hintchars').value
  }, null)
}

/*********** vimium compatibility layer *****************/
settings = {
    values: {},
    get: function(key) {
      return this.values[key];
    },
    set: function(key, value) {
      this.values[key] = value;
    }
  };
/*********** vimium compatibility layer *****************/