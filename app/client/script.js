/*
const element = (
	<button type='button' onclick='getIP()'>click here to find your public IP</button>
);
ReactDOM.render(ipUI, document.getElementById('root'))
*/

/* function that determines the current public IP address of host 
the ip address is then rendered in the DOM in the div 'root' on h1 */
function getIP() {
    var request = new XMLHttpRequest()
    request.open("GET", '192.168.1.16:3000/findip')
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var publicIP = request.responseText
            console.log(publicIP)
            ReactDOM.render( /*#__PURE__*/React.createElement("p", null, publicIP), document.getElementById('root'))
        }
    }
    request.send()
}
