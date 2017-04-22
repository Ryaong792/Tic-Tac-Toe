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
    updateGame(gameObject)
  } else return false
}

// currentTurn function that works out who goes first
const currentTurn = function () {
  currentPlayer = currentPlayer === player1 ? player2 : player1
  // been having issues with players not rotating
  return currentPlayer
}

// ******************** CHECK FOR WIN LOGIC***********************
// Check if there is a Win/Draw
const checkForWin = function (player, playerTiles) {
// 'if' statement to stop the wins/draw if game is over
  if (gameOver === true) {
    $('#game-over').modal('show')
    return
  }
  // for loop to loop through winning array and check for wins
  for (let i = 0; i < winningCombinations.length; i += 1) {
    const currentCombo = winningCombinations[i]
    const winCombo = []
    playerTiles.forEach((index) => {
      if (currentCombo.indexOf(index) > -1) {
        if (winCombo.indexOf(index) === -1) {
          winCombo.push(index)
        }
      }
    })
    // if loops find count of 3 playerTiles that matches winning array to find win
    if (winCombo.length === 3) {
      declareAndLogWinner(player, winCombo)
      gameOver = true // added to tell server game state and used to stop loops
      return false  // breaks/stop loop after win.
    }
  }
  if (usedTiles.length === 9) {
    $('#draw').modal('show')
    $('#nyan')[0].play()
    gameOver = true
    return false
  }
  currentTurn()
}
// ********************* end of win logic ****************************

// Declares and announce win/draw on modal ---
const declareAndLogWinner = function (player, combo) {
  // Declare the winner and log the result here
  $(`#winner${player}`).modal('show')
  return false
}
// reset button and reset currentPlayer status to X and reset
// arrays on playerArray to empty to reset the win fucntions
// need to add server create game to button
const startNewGame = function () {
  event.preventDefault()
  $('.modal').modal('hide')
  $('#nyan').attr('src', '../../nyan.mp3')
  currentPlayer = player1
  usedTiles = []
  playerArray = {[player1]: [], [player2]: []}
  gameOver = false
  $('.square').text('')
  setTimeout(getGameOver, 500)
  setTimeout(createGame, 600)
  return false
}

const nyan = function () {
  $('#nyan').attr('src', '')
}
// *********** Game board setup tracks clicks to index and add
// to Players Arrays
const setUpGameBoard = function () {
  for (let i = 0; i < gameCellIds.length; i++) {
    const elementID = gameCellIds[i]
    const element = document.getElementById(elementID)
    element.addEventListener('click', updateCell)
  }
}
const updateCell = function () {
  if (gameOver) {
    $('#game-over').modal('show')
    return false
  }
  const id = this.id
  const index1 = id.split('-')
  const index = parseInt(index1[1])
  // usedTiles and push the index of moves to array (total moves)
  // this will check if the tile that player click doesn't exist
  // checks if the tile is already in used with the usedtiles array
  if (usedTiles.indexOf(index) === -1) {
    usedTiles.push(index)
    playerArray[currentPlayer].push(index)
    checkForWin(currentPlayer, playerArray[currentPlayer])
  // Check for used tiles here and restart the game
  }
  return false
}

const resetGame = function () {
  currentPlayer = player1
  usedTiles = []
  playerArray = {[player1]: [], [player2]: []}
  gameOver = false
  $('.square').text('')
  return false
}
const addHandlers = () => {
  $('.newgame').on('click', startNewGame)
  $('.square').on('click', start)
  $('.newgame').on('click', nyan)
  $('.board').hide()
  $('#sign-out').hide()
  $('#change-password').hide()
}
module.exports = {
  addHandlers,
  setUpGameBoard,
  getGameOver,
  createGame,
  resetGame
}
