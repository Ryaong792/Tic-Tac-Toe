'use strict'
const store = require('../store.js')

const createGameSuccess = (data) => {
  store.game = data.game
}

const createGameFailure = (error) => {
  return error
}
const getGameSuccess = (data) => {
  store.games = data.games
  $('.stats').text('Total games played ' + data.games.length)
}

const getGameFailure = (error) => {
  return error
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  getGameSuccess,
  getGameFailure
}
