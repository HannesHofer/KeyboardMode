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