'use strict'

const player1 = 'X'
const player2 = 'O'
let board = new Array(9)
let currentPlayer = ''


// currentTurn function that works out who goes firsg
const currentTurn = function () {
  console.log(currentPlayer)
  currentPlayer = currentPlayer === player1 ? player2 : player1
  return currentPlayer
}
// start function that goes of the click event
const start = function () {
  $(this).html(currentTurn)
  $(this).unbind('click')
}

const addHandlers = () => {
  $('.square').on('click', start)
  $('.square').on('click')
}

module.exports = {
  addHandlers
}

// const isWin = function (player) {
  // let selectedArray = []
  // if (player === 'x') {
    // selectedArray = gameData.xCells
  // } else {
    // selectedArray = gameData.oCells
  // }
  // for every array in winningCombos array
  // return gameData.winningCombos.some(function (array) {
    // check to see if every element inner array combo
    // return array.every(function (e) {
      // is present in array of cells selected by player
      // return selectedArray.indexOf(e) !== -1
    // })
  // })
// }
