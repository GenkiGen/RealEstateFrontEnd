import {
  FETCH_OWN_PROJECTS_START,
  FETCH_OWN_PROJECTS_FAILED,
  FETCH_OWN_PROJECTS_SUCCESS,
  FETCH_ONE_PROJ_START,
  FETCH_ONE_PROJ_SUCCESS,
  FETCH_ONE_PROJ_FAILED
} from '../constants/action-types'
import { combineReducers } from 'redux'

const initialState = {
  oneLoading: false,
  oneError: null,
  loading: false,
  error: null,
  projects: [],
  total: 0
}

function ownProjectReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ONE_PROJ_START:
      return {
        ...state,
        oneLoading: true,
        oneError: null
      }
    case FETCH_ONE_PROJ_SUCCESS:
      return {
        ...state, 
        oneLoading: false,
        oneError: null,
        projects: [...state.projects, action.payload.project],
        total: state.total + 1
      }
    case FETCH_ONE_PROJ_FAILED:
      return {
        ...state,
        oneLoading: false,
        oneError: action.payload.error
      }
    case FETCH_OWN_PROJECTS_START:
      return {
        loading: true,
        error: null,
        total: 0,
        projects: []
      }
    case FETCH_OWN_PROJECTS_FAILED:
      return {
        loading: false,
        error: action.payload.error,
        total: 0,
        projects: []
      }
    case FETCH_OWN_PROJECTS_SUCCESS:
      return {
        loading: false,
        error: null,
        total: action.payload.total,
        projects: action.payload.projects
      }
    default:
      return state
  }
}

export default combineReducers({
  own: ownProjectReducer
})
