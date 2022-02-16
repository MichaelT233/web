// web client
function displayDropdown() {
    var dropdownContent = document.getElementById('dropdownContent')
    if (dropdownContent.className == 'dropdownContentOn') {
        dropdownContent.style.animationName = 'slidein'
        dropdownContent.className = 'dropdownContentOff'
        document.getElementById('menuIcon').style.display = 'block'
    }
    else {
        dropdownContent.style.animationName = 'slideout'
        dropdownContent.className = 'dropdownContentOn'
        document.getElementById('menuIcon').style.display = 'none'
    }
}
window.addEventListener('load', ()=>{
    /***********************************/
    document.getElementById('menuIcon').addEventListener('click', ()=> {
        displayDropdown()
    })
    document.getElementById('closeIcon').addEventListener('click', ()=> {
        displayDropdown()
    })
    if (location.pathname == '/membership') {
        var qSelect = document.getElementById('qSelect')
        qSelect.addEventListener('click', () => {
            qSelect.select()
        })
        qSelect.oninput = () => {document.getElementById('total').innerHTML = document.getElementById('qSelect').value + "x"}
    }
    /***********************************/
})