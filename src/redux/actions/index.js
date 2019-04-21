import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  FETCH_ADS_START,
  FETCH_ADS_FAILED,
  FETCH_ADS_SUCCESS
} from '../constants/action-types'
import service from '../../sevices/dataService'
import history from '../../router/history'

//Authentictae
function loginStart() {
  return {
    type: LOGIN_START
  }
}

function loginFailed() {
  return {
    type: LOGIN_FAILED
  }
}

function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export function logout() {
  function _logout() {
    return {
      type: LOGOUT
    }
  }

  return function(dispatch) {
    service.logout()
    dispatch(_logout())
  }
}

export function login(username, password) {
  return function(dispatch) {
    dispatch(loginStart())
    service.login(username, password)
           .then(success => {
              dispatch(loginSuccess({ 
                accessToken: success.data.accessToken,
                userId: success.data.userId 
              })) 
              history.push('/')
            })
           .catch(error => dispatch(loginFailed({ error })))
  }
}

//Registration
function signupStart() {
  return {
    type: SIGNUP_START
  }
}

function signupFailed(payload) {
  return {
    type: SIGNUP_FAILED,
    payload
  }
}

export function signup(username, password) {
  return function(dispatch) {
    dispatch(signupStart())
    service.register(username, password)
           .then(data => { 
             dispatch(loginSuccess({
              accessToken: data.data.accessToken,
              userId: data.data.userId
             }))
             history.push('/')
            })
           .catch(error => {
              const { data, status } = error.response
              console.log(data.data.error.message)
              if (status === 402) {
                dispatch(signupFailed({ error: data.data.error.message }))
              } else {
                dispatch(signupFailed({ error: "An unknown error occured" }))
              }
            })
  }
}

//Advertisement
export function fetchAdverstisements() {
  return function(dispatch) {
    dispatch(start())
    service.getAllAdvertisements()
         .then(data => dispatch(success({ advertisements: data.data })))
         .catch(error => dispatch(failed({ error })))
  } 
  
  function start() {
    return {
      type: FETCH_ADS_START
    }
  }

  function success(payload) {
    return {
      type: FETCH_ADS_SUCCESS,
      payload
    }
  }

  function failed(payload) {
    return {
      type: FETCH_ADS_FAILED,
      payload
    }
  }
}