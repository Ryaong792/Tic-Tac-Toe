'use strict'

const config = require('../config')
const store = require('../store')

// creation of game to AJAX -
const createGame = () => {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ''
  })
}
// updating game t

const updateGame = (data) => {
  const game = store.game
  return $.ajax({
    url: config.apiOrigin + '/games/' + game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getGameOver = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createGame,
  updateGame,
  getGameOver
}
