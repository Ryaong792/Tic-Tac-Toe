'use strict'
const store = require('../store.js')

const createGameSuccess = (data) => {
  store.game = data.game
}

const createGameFailure = (error) => {
  return error
}
const getGameSuccess = (data) => {
  store.game = data.games
  console.log('number of games ', data.games.length)
  $('.stats').text(data.games.length)
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
