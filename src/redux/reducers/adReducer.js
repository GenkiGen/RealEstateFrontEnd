import {
  FETCH_ADS_START,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_FAILED
} from '../constants/action-types'

const initialState = {
  loading: false,
  error: null,
  ads: []
}

export default function adReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ADS_START:
      return {
        loading: true,
        error: null,
        ads: []
      }
    case FETCH_ADS_SUCCESS:
      return {
        loading: false,
        error: null,
        ads: action.payload.advertisements,
      }
    case FETCH_ADS_FAILED:
      return {
        loading: false,
        error: action.payload.error,
        ads: []
      }
    default:
      return state
  }
}