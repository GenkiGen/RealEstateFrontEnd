import {
  SIGNUP_START,
  SIGNUP_FAILED
} from '../constants/action-types'

const initialState = {
  signingUp: false,
  succeeded: false,
  error: null
}

export default function regisReducer(state = initialState, action) {
  switch(action.type) {
    case SIGNUP_START:
      return {
        signingUp: true,
        succeeded: false,
        error: null
      }
    case SIGNUP_FAILED:
      return {
        signingUp: false,
        succeeded: false,
        error: action.payload.error
      }
    default:
      return state
  }
}