/*
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
*/

/* function that determines the current public IP address of host 
the ip address is then rendered in the DOM in the div 'root' on h1 */
function getIP() {
    var request = new XMLHttpRequest()
    request.open("GET", '//127.0.0.1:3000/findip')
    request.onreadystatechange = function ready() {
        if(request.readyState == XMLHttpRequest.DONE) {
            var publicIP = request.responseText
            console.log(publicIP)
            ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, publicIP), document.getElementById('root'))
        }
    }
    request.send()
}