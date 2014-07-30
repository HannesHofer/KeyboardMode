openUrlInIncognito = function(request) {
    chrome.windows.create({url: request.url, incognito: true});
};

openUrlInNewWindow = function(request) {
    chrome.windows.create({url: request.url});
};

sendRequestHandlers = {
    openUrlInIncognito: openUrlInIncognito,
    openUrlInNewWindow: openUrlInNewWindow
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (sendRequestHandlers[request.handler]) {
      sendResponse(sendRequestHandlers[request.handler](request, sender));
    }
    return false;
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_link_hints"}, function(response) {});
  });
});