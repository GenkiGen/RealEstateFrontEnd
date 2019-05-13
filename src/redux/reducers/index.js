import { combineReducers } from 'redux'
import authReducer from './authReducer'
import regisReducer from './regisReducer'
import { adReducer, ownAdReducer } from './adReducer'
import projReducer from './projReducer'
import viewReducer from './viewReducer'

export default combineReducers({
  auth: authReducer,
  registration: regisReducer,
  advertisements: adReducer,
  ownAdvertisements: ownAdReducer,
  projects: projReducer,
  view: viewReducer
})