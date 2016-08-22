
chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
    var title = "Send image to server";
    var id = chrome.contextMenus.create({ "title": title, "contexts":["image"], "id": "image" });
});


function onClickHandler(info, tab) {

    var serverUrl = "http://localhost:3000/upload";

    var xhr = createCORSRequest('POST', serverUrl);

    xhr.responseType = 'text';
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("url=" + info.srcUrl);
    
    alert('Your image was sent successfully');
};

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } 
  else if (typeof XDomainRequest !== "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } 
  else {
    xhr = null;
  }
  return xhr;
}