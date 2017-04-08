'use strict'

const config = require('../config')
const store = require('../store')

const createGame = () => {
  console.log('created the game')
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: ''
  })
}

module.exports = {
  createGame
}
