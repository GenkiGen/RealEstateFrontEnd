import { combineReducers } from 'redux'
import authReducer from './authReducer'
import regisReducer from './regisReducer'
import adReducer from './adReducer'

export default combineReducers({
  auth: authReducer,
  registration: regisReducer,
  advertisements: adReducer
})