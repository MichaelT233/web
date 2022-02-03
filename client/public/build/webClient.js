/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./webClient.js ***!
  \**********************/
function displayDropdown() {
  if (document.getElementById('dropdownContent').className == 'dropdownContentOn') {
    document.getElementById('dropdownContent').className = 'dropdownContentOff';
  } else {
    document.getElementById('dropdownContent').className = 'dropdownContentOn';
  }
}

window.addEventListener('load', () => {
  document.getElementById('menuIcon').addEventListener('click', () => {
    displayDropdown();
  });
  var dropdownContent = document.getElementById('dropdownContent');
  dropdownContent.addEventListener('click', () => {
    dropdownContent.className = 'dropdownContentOff';
  });
  document.getElementById('content').addEventListener('click', () => {
    dropdownContent.className = 'dropdownContentOff';
  });
  var qSelect = document.getElementById('qSelect');
  qSelect.addEventListener('click', () => {
    qSelect.select();
  });

  qSelect.oninput = () => {
    document.getElementById('total').innerHTML = document.getElementById('qSelect').value + "x";
  };
});

/******/ })()
;