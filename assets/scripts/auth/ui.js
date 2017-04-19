'use strict'

const store = require('../store')
const game = require('../game/events.js')

const signUpSuccess = (data) => {
  $('.success').show().text('Account has been created successfully.  Please sign-in to play!')
  setTimeout(function () {
    $('.success').fadeOut().empty()
  }, 5000)
  $('#sign-up').trigger('reset')
  return false
}

const signUpFailure = () => {
  $('.failure').show().text('Account creation failed.  Email may already be in used or passwords did not match.  Please try again!')
  setTimeout(function () {
    $('.failure').fadeOut().text('')
  }, 7000)
  $('#sign-up').trigger('reset')
  return false
}

const signInSuccess = (response) => {
  store.user = response.user
  $('#sign-out').show()
  $('#change-password').show()
  $('.board').show()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('.success').show().text('Sign-in Successful! Enjoy your game!')
  setTimeout(function () {
    $('.success').fadeOut().empty()
  }, 5000)
  $('#sign-in').trigger('reset')
  game.createGame()
  setTimeout(game.getGameOver(), 200)
  return false
}

const signInFailure = () => {
  $('.failure').show().text('Email or passowrd is incorrect! Please try again!')
  setTimeout(function () {
    $('.failure').fadeOut().text('')
  }, 6000)
  $('#sign-in').trigger('reset')
  return false
}

const signOutSuccess = () => {
  store.user = null
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('.stats').text('')
  $('#change-password').hide()
  $('.board').hide()
  $('.success').show().text('You have successfully signed-out! Please sign-in to play again!')
  setTimeout(function () {
    $('.success').fadeOut().empty()
  }, 5000)
  game.resetGame()
}

const signOutFailure = () => {
}

const changePasswordSuccess = () => {
  store.user = null
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('.stats').text('')
  $('#change-password').hide()
  $('.board').hide()
  $('.success').show().text('Password has been change successfully! Please Sign in again with your new password to play!')
  setTimeout(function () {
    $('.success').fadeOut().empty()
  }, 7000)
  $('#change-password').trigger('reset')
  return false
}

const changePasswordFailure = () => {
  $('.failure').show().text('Failed to change password! Old Password did not match! Please try again!')
  setTimeout(function () {
    $('.failure').fadeOut().text('')
  }, 6000)
  $('#change-password').trigger('reset')
  return false
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
