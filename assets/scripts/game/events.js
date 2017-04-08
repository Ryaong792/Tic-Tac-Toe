'use strict'
const gameui = require('./gameui.js')
const gameapi = require('./gameapi.js')

// const players = ['X', 'O']
const player1 = 'X'
const player2 = 'O'
let gameOver = false
// let board = new Array(9)
let usedTiles = []
let currentPlayer = 'X'
let tileObject = {[player1]: [], [player2]: []}

// API SHIT
const createGame = function () {
  gameapi.createGame()
// puts failure or success
  .then(gameui.createGameSuccess)
  .catch(gameui.createGameFailure)
}

const updateGame = function (data) {
  gameapi.updateGame(data)
}

// **************************
// reset button and reset currentPlayer status to X and reset
// arrays on tileObject to empty to reset the win fucntions
const resetGame = function () {
  event.preventDefault()
  currentPlayer = player1
  usedTiles = []
  tileObject = {[player1]: [], [player2]: []}
  $('.square').text('')
  $('.square').on('click', start)
  console.log(resetGame)
}
// currentTurn function that works out who goes first
const currentTurn = function () {
  console.log(currentPlayer)
  currentPlayer = (currentPlayer === player1) ? player2 : player1
  console.log(currentPlayer)
  return currentPlayer
}

// start function that goes of the click event
const start = function () {
  // added if and or statement to stop the clicks
  if (gameOver === false && $(this).text() !== 'X' && $(this).text() !== 'O') {
    $(this).html(currentPlayer)
    currentTurn()
  // takes the ID for the game API
    const id = ''
    const index1 = id.split('-')
    const index = parseInt(index1[1])

    const gameObject = {
      'game': {
        'cell': {
          'index': index,
          'value': currentPlayer
        },
        'over': gameOver
      }
    }
    updateGame(gameObject)
  }
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
      gameOver = true
    }
  }
  if (usedTiles.length === 9) {
    $('#draw').modal('show')
    gameOver = true
  }
}

const setUpGameBoard = function () {
  console.log('setUpGameBoard ran!')
  for (let i = 0; i < gameCellIds.length; i++) {
    const elementID = gameCellIds[i]
    const element = document.getElementById(elementID)
    element.addEventListener('click', updateCell)
  }
}

const updateCell = function () {
  // console.log(currentPlayer)
  console.log('update cell this: ', this)
  const id = this.id
  console.log('this element id = ' + id)
  const index1 = id.split('-')
  const index = parseInt(index1[1])
  // usedTiles and push the index of moves to array
  usedTiles.push(index)
  tileObject[currentPlayer].push(index)
  console.log(currentPlayer, tileObject[currentPlayer], index)
  checkForWin(currentPlayer, tileObject[currentPlayer])
  // Check for used tiles here and restart the game
}

const addHandlers = () => {
  $('#reset').on('click', resetGame)
  $('#create').on('click', createGame)
  $('.square').on('click', start)
}

module.exports = {
  addHandlers,
  setUpGameBoard,
  updateCell,
  gameui,
  gameapi,
  updateGame
}
