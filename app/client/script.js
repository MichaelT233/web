//needs general error handling
//needs anti-spam mechanism

//REST API get call
function get(url, callback, id) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var text = request.responseText
            callback(id, text)
        }
    }
    request.send()
}

//displays text in given HTML element id
function displayText(id, text) {
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, text), document.getElementById(id))
}

function fingerprint() {
    get('ip', displayText, 'showIP')
    get('port', displayText, 'showPort')
    displayText('showPlatform', 'Platform = ' + navigator.platform)
    displayText('showBrowser', 'Browser = ' + navigator.appCodeName)
    displayText('showCores', 'Processors = ' + navigator.hardwareConcurrency  + ' logical cores')
    displayText('showMemory', 'System Memory = ' + navigator.deviceMemory + ' GB')
}