const config = require('./config/default.json')

const drawPaper = require('./drawPaper')

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
console.log('loaded client.js')

// const $genBoxes = $('#genBoxes')
// $genBoxes.addEventListener('click', newBox)

window.onload = function () {
  drawPaper()
}
