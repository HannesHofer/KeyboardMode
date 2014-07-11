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
  saveAll();
}

function deactivateDefault(def, nosave) {
  var names = ['follow', 'newtab', 'newbacktab', 'incognito', 'backincognito'];
  var types = ['strg', 'alt', 'shift', 'deactivated']
  /*********** deactivate impossible options ************/
  for (name in names) {
    for (type in types) {
      id = document.getElementById(names[name] + types[type])
      if (id != null) {
	if (id.checked && (def === names[name]))
	  id.checked = false;
	id.disabled = (def === names[name]);
      }
    }
    
    var text = document.getElementById(names[name])
    if (text != null)
      text.style.color = (def === names[name]) ? 'gray' : 'black';
    
    text = document.getElementById(names[name]+'text')
    if (text != null)
      text.style.color = (def === names[name]) ? 'gray' : 'black';
    
  }
  /*********** deactivate impossible options ***********/ 
  if (!nosave)
    saveAll();
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
  var follow, newtab, newbacktab, incognito, backincognito;
  follow = document.querySelector('input[name = "defaultopen"]:checked');
  newtab = document.querySelector('input[name = "defaultnewtab"]:checked');
  newbacktab = document.querySelector('input[name = "defaultnewbacktab"]:checked');
  incognito = document.querySelector('input[name = "defaultincognito"]:checked');
  backincognito = document.querySelector('input[name = "defaultbackincognito"]:checked');
  
  
  follow = (follow === null) ? "" : follow.id;
  newtab = (newtab === null) ? "" : newtab.id;
  newbacktab = (newbacktab === null) ? "" : newbacktab.id;
  incognito = (incognito === null) ? "" : incognito.id;
  backincognito = (backincognito === null) ? "" : backincognito.id;
  
  chrome.storage.sync.set({
    metakeyfollow: follow,
    metakeynewtab: newtab,
    metakeynewbacktab: newbacktab,
    metakeyincognito: incognito,
    metakeybackincognito: backincognito
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
    deactivateDefault(items.linkhintdefault, true)
  });
  
  loadLinkMetaKey(function(items) {
    if (items.metakeyfollow != "")
      document.getElementById(items.metakeyfollow).checked = true;
    if (items.metakeynewtab != "")
      document.getElementById(items.metakeynewtab).checked = true;
    if (items.metakeynewbacktab != "")
      document.getElementById(items.metakeynewbacktab).checked = true;
    if (items.metakeyincognito != "")
      document.getElementById(items.metakeyincognito).checked = true;
    if (items.metakeybackincognito != "")
      document.getElementById(items.metakeybackincognito).checked = true;
    
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

function loadLinkMetaKey(func) {
  chrome.storage.sync.get({
    metakeyfollow: "",
    metakeynewtab: "",
    metakeynewbacktab: "",
    metakeyincognito: "",
    metakeybackincognito: ""
  }, func);  
}
/********************* eventhandlers for onclick ******************/

window.onload = function() {
  document.getElementById('follow').onclick = function(){ deactivateDefault('follow',false);}
  document.getElementById('newtab').onclick = function(){deactivateDefault('newtab',false);}
  document.getElementById('newbacktab').onclick = function(){ deactivateDefault('newbacktab',false);}
  document.getElementById('incognito').onclick = function(){ deactivateDefault('incognito',false);}
  document.getElementById('backincognito').onclick = function(){ deactivateDefault('backincognito',false);}

  document.getElementById('followstrg').onclick = function(){ deactivateMetakey('follow','strg');}
  document.getElementById('followalt').onclick = function(){ deactivateMetakey('follow','alt');}
  document.getElementById('followshift').onclick = function(){ deactivateMetakey('follow','shift');}
  document.getElementById('newtabstrg').onclick = function(){ deactivateMetakey('newtab','strg');}
  document.getElementById('newtabalt').onclick = function(){ deactivateMetakey('newtab','alt');}
  document.getElementById('newtabshift').onclick = function(){ deactivateMetakey('newtab','shift');}
  document.getElementById('newbacktabstrg').onclick = function(){ deactivateMetakey('newbacktab','strg');}
  document.getElementById('newbacktabalt').onclick = function(){ deactivateMetakey('newbacktab','alt');}
  document.getElementById('newbacktabshift').onclick = function(){ deactivateMetakey('newbacktab','shift');}
  document.getElementById('incognitostrg').onclick = function(){ deactivateMetakey('incognito','strg');}
  document.getElementById('incognitoalt').onclick = function(){ deactivateMetakey('incognito','alt');}
  document.getElementById('incognitoshift').onclick = function(){ deactivateMetakey('incognito','shift');}
  document.getElementById('backincognitostrg').onclick = function(){ deactivateMetakey('backincognito','strg');}
  document.getElementById('backincognitoalt').onclick = function(){ deactivateMetakey('backincognito','alt');}
  document.getElementById('backincognitoshift').onclick = function(){ deactivateMetakey('backincognito','shift');}
  
  document.getElementById('hintchars').oninput = function(){ storeHintChars();}
  document.getElementById('keycombKeycode').oninput = function(){ storeKeycombination();}
  document.getElementById('keycombStrg').onclick = function(){ storeKeycombination();}
  document.getElementById('keycombAlt').onclick = function(){ storeKeycombination();}
  document.getElementById('keycombShift').onclick = function(){ storeKeycombination();}    
}

document.addEventListener('DOMContentLoaded', loadAll);
/********************* eventhandlers for onclick ******************/