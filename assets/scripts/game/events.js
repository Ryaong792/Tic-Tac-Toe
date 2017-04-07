'use strict'
// const players = ['X', 'O']
const player1 = 'X'
const player2 = 'O'
// let board = new Array(9)
let currentPlayer = 'X'
const tileObject = {[player1]: [], [player2]: []}

// currentTurn function that works out who goes first
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
// end of start click funtions **************
// start of winning combos
const winningCombinations = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonal
  [0, 4, 8],
  [2, 4, 6]
]

//const usedTile = []

// GAME API capture ************************
let gameCellIds = [
  'box-0',
  'box-1',
  'box-2',
  'box-3',
  'box-4',
  'box-5',
  'box-6',
  'box-7',
  'box-8'
]

const gameObject = {
  'game': {
    'id': 3,
    'cells': ['', '', '', '', '', '', '', '', ''],
    'over': false,
    'player_x': {
      'id': 1,
      'email': 'and@and.com'
    },
    'player_o': {
      'id': 2,
      'email': 'ande@and.com'
    }
  }
}

const declareAndLogWinner = function (player, combo) {
  // Declare the winner and log the result here
  $(`#winner${player}`).modal('show')
  // $('#player2-score').
  alert(`${player} wins`)
  return
}

// Check if there is a win
const checkForWin = function (player, playerTiles) {
  // Check if the play has up to 3 tiles before moving on to
  for (let i = 0; i < winningCombinations.length; i += 1) {
    const currentCombo = winningCombinations[i]
    let count = 0
    playerTiles.forEach((index) => {
      if (currentCombo.indexOf(index) > -1) {
        count += 1
      }
    })
    if (count === 3) {
      declareAndLogWinner(player, currentCombo)
      break
    }
  }
}

const setUpGameBoard = function () {
  console.log('setUpGameBoard ran!')
  for (let i = 0; i < gameCellIds.length; i++) {
    const elementID = gameCellIds[i]
    const element = document.getElementById(elementID)
    element.addEventListener('click', updateCell)
  }
  $('.square').on('click', start)
}

const updateCell = function () {
  // console.log(currentPlayer)
  console.log('update cell this: ', this)
  const id = this.id
  console.log('this element id = ' + id)
  const index1 = id.split('-')
  const index = parseInt(index1[1])
  tileObject[currentPlayer].push(index)
  console.log(currentPlayer, tileObject[currentPlayer], index)
  checkForWin(currentPlayer, tileObject[currentPlayer])
  // Check for used tiles here and restart the game
}

const addHandlers = () => {
}

module.exports = {
  addHandlers,
  setUpGameBoard,
  updateCell
}
