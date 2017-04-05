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

const authEvents = require('./auth/events.js')

// On document ready
$(() => {
  authEvents.addHandlers()
})

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
  //if { Need a winning combo}
})

//let winningArray = {
  //[1,2,3], [4,5,6], [7,8,9], [1,4,7], [1,5,9], [2,4,8], [3,5,7], [3,6,9]

  // If any of these patters of board spaces have all X's or all O's somebody won!
  //wins: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]],
