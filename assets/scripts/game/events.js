'use strict'
const gameui = require('./gameui.js')
const gameapi = require('./gameapi.js')

// Lets of all 'const'
const player1 = 'X'
const player2 = 'O'
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
// LIST OF ALL 'let'
let gameOver = false
let usedTiles = []
let currentPlayer = player1
let playerArray = {[player1]: [], [player2]: []}
// Game cells ID ******
const gameCellIds = [
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
// server communications ****************** see game API
// pulls new game from server (POST)
const createGame = function () {
  gameapi.createGame()
  .then(gameui.createGameSuccess)
  .catch(gameui.createGameFailure)
}
// send update of current game to server (PATCH)
const updateGame = function (data) {
  gameapi.updateGame(data)
}
// pulls total game played by user (GET)
const getGameOver = function (data) {
  gameapi.getGameOver(data)
  .then(gameui.getGameSuccess)
  .catch(gameui.getGameFailure)
}
// ***************************************************

// functions that goes of the on click event in addHandlers *********
// Start funciton: starts on click, gather info for server, update server with
// current game data
const start = function () {
  // added 'if' statemant to stop click events if game is over
  // and if box has has a string "X or O" to not allow any clicks
  if (gameOver === false && $(this).text() !== 'X' && $(this).text() !== 'O') {
  // takes the info of current game and sends to server
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
    $(this).html(currentPlayer)
    currentTurn()
    updateGame(gameObject)
  }
}

// currentTurn function that works out who goes first
const currentTurn = function () {
  currentPlayer = currentPlayer === player1 ? player2 : player1
  // console.log(currentPlayer) been having issues with players not rotating
  return currentPlayer
}

// ******************** CHECK FOR WIN LOGIC***********************
// Check if there is a Win/Draw
const checkForWin = function (player, playerTiles) {
// 'if' statement to stop the wins/draw if game is over
  if (gameOver === true) {
    $('#new').modal('show')
    return
  }
  // for loop to loop through winning array and check for wins
  for (let i = 0; i < winningCombinations.length; i += 1) {
    const currentCombo = winningCombinations[i]
    let count = 0
    playerTiles.forEach((index) => {
      if (currentCombo.indexOf(index) > -1) {
        count += 1
      }
    })
    // if loops find count of 3 playerTiles that matches winning array to find win
    if (count === 3) {
      declareAndLogWinner(player, currentCombo)
      gameOver = true // added to tell server game state and used to stop loops
      return false  // breaks/stop loop after win.
    }
  }
  if (usedTiles.length === 9) {
    $('#draw').modal('show')
    gameOver = true
    return false
  }
}
// ********************* end of win logic ****************************

// Declares and announce win/draw on modal ---
const declareAndLogWinner = function (player, combo) {
  // Declare the winner and log the result here
  $(`#winner${player}`).modal('show')
  return
}
// reset button and reset currentPlayer status to X and reset
// arrays on playerArray to empty to reset the win fucntions
// need to add server create game to button
const startNewGame = function () {
  event.preventDefault()
  currentPlayer = player1
  usedTiles = []
  playerArray = {[player1]: [], [player2]: []}
  gameOver = false
  $('.square').text('')
  console.log(startNewGame)
}

// *********** Game board setup tracks clicks to index and add
// to Players Arrays
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
  // usedTiles and push the index of moves to array (total moves)
  usedTiles.push(index)
  playerArray[currentPlayer].push(index)
  console.log(currentPlayer, playerArray[currentPlayer], index)
  checkForWin(currentPlayer, playerArray[currentPlayer])
  // Check for used tiles here and restart the game
}

const addHandlers = () => {
  $('#reset').on('click', startNewGame)
  // need to add create game to StartNewGame
  $('#create').on('click', createGame)
  $('.square').on('click', start)
}

module.exports = {
  addHandlers,
  setUpGameBoard,
  getGameOver
}
