'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const player1 = 'X'
const player2 = 'O'
let currentTurn = player1
// javascript .on click feature.  $('ID or class').on('click', Dosomething)
// condition ? expression1 : expression2 short cut for if
// conditon will need to be true/false.  Didn't work when i had no var
// TAKE YOU! YOU TUBE!
$('.square').on('click', function (e) {
  $(this).html(currentTurn = currentTurn === player1 ? player2 : player1)
  $(this).unbind('click')
})
