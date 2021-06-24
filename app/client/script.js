//needs general error handling
//needs anti-spam mechanism

//function that calls the associated functions according to the drop down menu
function selectCallback() {
    var selections = document.getElementById('actions')
    var value = selections.value
    switch (value){
        case 'fingerprint':
            fingerprint()
            break
        case 'traceroute':
            traceroute()
            break
    }
}

//REST API get call
function get(url, callback) {
    var request = new XMLHttpRequest()
    request.open("GET", url)
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var text = request.responseText
            callback(text)
        }
    }
    request.send()
}

//fingerprints client and renders results
function fingerprint() {
    function renderIP(ip) {
      ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "Public IP Address = ", ip), document.getElementById('output0'));
    }
    function renderPort(port) {
      ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "Port Number = ", port), document.getElementById('output1'));
    }  
    get('ip', renderIP);
    get('port', renderPort);
    ReactDOM.render( /*#__PURE__*/React.createElement("p", null, "Platform = ", navigator.platform, /*#__PURE__*/React.createElement("br", null), "Browser = ", navigator.appCodeName, /*#__PURE__*/React.createElement("br", null), "Logical CPU Cores = ", navigator.hardwareConcurrency, /*#__PURE__*/React.createElement("br", null), "System Memory = ", navigator.deviceMemory, " GB"), document.getElementById('output2'));
}  

//traceroutes client and renders the result
function traceroute() {
    function renderTrace(text) {
        ReactDOM.render( /*#__PURE__*/React.createElement("p", null, text), document.getElementById('output0'))
        ReactDOM.render( /*#__PURE__*/React.createElement("p", null, null), document.getElementById('output1'))
        ReactDOM.render( /*#__PURE__*/React.createElement("p", null, null), document.getElementById('output2'))
    }
    get('trace', renderTrace)
}