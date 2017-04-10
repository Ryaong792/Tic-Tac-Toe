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
}

const signInFailure = () => {
}

const signOutSuccess = () => {
  store.user = null
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
