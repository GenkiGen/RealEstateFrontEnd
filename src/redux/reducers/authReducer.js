import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT
} from '../constants/action-types'
import auth from '../../sevices/authService'

const initialState = auth.isLoggedIn() ? {
  loggingIn: false,
  userId: null,
  authFailed: false,
  token: auth.getToken()
} : {
  loggingIn: false,
  userId: null,
  authFailed: false,
  token: null
}

function authReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_START:
      return {
        loggingIn: true,
        userId: null,
        authFailed: false,
        token: null
      }
    case LOGIN_FAILED:
      return {
        loggingIn: false,
        userId: null,
        authFailed: true,
        token: null
      }
    case LOGIN_SUCCESS:
      return {
        loggingIn: false,
        userId: action.payload.userId, 
        authFailed: false,
        token: action.payload.accessToken
      }
    case LOGOUT:
      return {
        loggingIn: false,
        userId: null,
        authFailed: false,
        token: null
      }
    default:
      return state
  }
}

export default authReducer