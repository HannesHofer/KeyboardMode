function deactivateMetakey(deactivatetype, caller) {
  var names = ['follow', 'newtab', 'newbacktab', 'incognito', 'backincognito'];
  var name;
  for (name in names) {
    if (names[name] != deactivatetype) {
      if (document.getElementById(names[name]+caller).checked) {
	  document.getElementById(names[name]+caller).checked = false;
	  document.getElementById(names[name]+'deactivated').checked = true;
      }
    }
  }
}

function deactivateDefault(def) {
  var names = ['follow', 'newtab', 'newbacktab', 'incognito', 'backincognito'];
  var types = ['strg', 'alt', 'shift', 'deactivated']
  /*********** deactivate impossible options ************/
  for (name in names) {
    for (type in types) {
      id = document.getElementById(names[name] + types[type])
      if (id != null)
	id.disabled = (def === names[name]);
    }
    
    var text = document.getElementById(names[name])
    if (text != null)
      text.style.color = (def === names[name]) ? 'gray' : 'black';
    
    text = document.getElementById(names[name]+'text')
    if (text != null)
      text.style.color = (def === names[name]) ? 'gray' : 'black';
  }
  /*********** deactivate impossible options ***********/ 
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

function saveAll() {
  storeKeycombination();
  storeLinkHintDefault();
  storeLinkMetaKey();
  storeHintChars();
}



function loadAll() {
  loadHintChars(function(items) {
    document.getElementById('hintchars').value = items.hintchars
  });
  
  loadKeycombination(function(items) {
    document.getElementById('keycombStrg').checked = items.keycombStrg
    document.getElementById('keycombAlt').checked = items.keycombAlt
    document.getElementById('keycombShift').checked = items.keycombShift
    document.getElementById('keycombKeycode').value = items.keycombKeycode
  });
  
  loadLinkHintDefault(function(items) {
    document.getElementById(items.linkhintdefault).checked = true;
    deactivateDefault(items.linkhintdefault)
  });
  
  
}

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

document.addEventListener('DOMContentLoaded', loadAll);