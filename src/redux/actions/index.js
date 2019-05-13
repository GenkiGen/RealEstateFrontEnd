import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  FETCH_ADS_START,
  FETCH_ADS_FAILED,
  FETCH_ADS_SUCCESS,
  FETCH_USER_INFO,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_OWN_ADS_START,
  FETCH_OWN_ADS_FAILED,
  FETCH_OWN_ADS_SUCCESS,
  FETCH_ONE_ADS_START,
  FETCH_ONE_ADS_FAILED,
  FETCH_ONE_ADS_SUCCESS
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
              if (status === 402) {
                dispatch(signupFailed({ error: data.data.error.message }))
              } else {
                dispatch(signupFailed({ error: "An unknown error occured" }))
              }
            })
  }
}

//Advertisement
export function fetchAdverstisements(page, sort, filter) {
  return function(dispatch) {
    dispatch(start())
    service.getAllAdvertisements(page, sort, filter)
         .then(data => dispatch(success({ 
           advertisements: data.data.advertisements,
           total: data.data.total
          })))
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

export function getOwnAds(page) {
  return function(dispatch) {
    dispatch(start)
    service.getOwnAdvertisement(page)
           .then(data => dispatch(success({ 
             advertisements: data.data.advertisements,
             total: data.data.total,
            })))
           .catch(error => dispatch(failed({ error })))
  }

  function start() {
    return {
      type: FETCH_OWN_ADS_START
    }
  }

  function success(payload) {
    return {
      type: FETCH_OWN_ADS_SUCCESS,
      payload
    }
  }

  function failed(payload) {
    return {
      type: FETCH_OWN_ADS_FAILED,
      payload
    }
  }
}

export function getOneAd(id) {
  return function(dispatch) {
    dispatch(start)
    service.getOneAdvertisement(id)
           .then(data => dispatch(success({ advertisement: data.data })))
           .catch(error => dispatch(failed({ error })))
  }

  function start() {
    return {
      type: FETCH_ONE_ADS_START
    }
  }

  function success(payload) {
    return {
      type: FETCH_ONE_ADS_SUCCESS,
      payload
    }
  }

  function failed(payload) {
    return {
      type: FETCH_ONE_ADS_FAILED,
      payload
    }
  }
}

//User infos
export function getUserInfo() {
  return function(dispatch) {
    dispatch(start())
    service.getUserInfo()
           .then(resp => dispatch(success({ data: resp.data })))
           .catch(error => dispatch(failed({ error })))
  }

  function success(payload) {
    return {
      type: FETCH_USER_SUCCESS,
      payload
    }
  }

  function failed(payload) {
    return {
      type: FETCH_USER_FAILED,
      payload
    }
  }

  function start() {
    return {
      type: FETCH_USER_INFO
    }
  }
}