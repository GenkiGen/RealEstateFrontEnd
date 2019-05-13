import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_USER_INFO
} from '../constants/action-types'
import auth from '../../sevices/authService'

const initialState = auth.isLoggedIn() ? {
  loggingIn: false,
  gettingInfo: true,
  user: null,
  authFailed: false,
  token: auth.getToken()
} : {
  loggingIn: false,
  gettingInfo: false,
  user: null,
  authFailed: false,
  token: null
}

function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        user: null,
        authFailed: false,
        token: null
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loggingIn: false,
        user: null,
        authFailed: true,
        token: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.payload.userId, 
        authFailed: false,
        token: action.payload.accessToken
      }
    case LOGOUT:
      return {
        ...state,
        loggingIn: false,
        user: null,
        authFailed: false,
        token: null
      }
    case FETCH_USER_INFO:
      return {
        ...state,
        gettingInfo: true
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        gettingInfo: false
      }
    case FETCH_USER_FAILED:
      return {
        ...state,
        user: null,
        gettingInfo: false
      }
    default:
      return state
  }
}

export default authReducer