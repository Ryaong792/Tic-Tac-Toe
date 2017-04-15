'use strict'

const store = require('../store')
const game = require('../game/events.js')

const signUpSuccess = (data) => {
}

const signUpFailure = () => {
}

const signInSuccess = (response) => {
  store.user = response.user
  game.getGameOver()
  $('#sign-out').show()
  $('#change-password').show()
  $('.board').show()
  $('#sign-in').hide()
  $('#sign-up').hide()
}

const signInFailure = () => {
}

const signOutSuccess = () => {
  store.user = null
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('.board').hide()
}

const signOutFailure = () => {
}

const changePasswordSuccess = () => {
  store.user = null
}

const changePasswordFailure = () => {
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
