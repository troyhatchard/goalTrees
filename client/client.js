const config = require('./config/default.json')
const GTG = require('./GTG')

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const treeBox = $('#tree')

const gtg = new GTG(treeBox, 'new tree')
