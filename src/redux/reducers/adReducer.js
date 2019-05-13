import {
  FETCH_ADS_START,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_FAILED,
  FETCH_OWN_ADS_START,
  FETCH_OWN_ADS_SUCCESS,
  FETCH_OWN_ADS_FAILED,
  FETCH_ONE_ADS_START,
  FETCH_ONE_ADS_SUCCESS,
  FETCH_ONE_ADS_FAILED
} from '../constants/action-types'

const initialState = {
  loading: false,
  oneError: null,
  oneLoading: false,
  error: null,
  ads: [],
  total: 0
}

export function adReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_OWN_ADS_SUCCESS:
      return {
        loading: false,
        error: null,
        total: action.payload.total,
        ads: action.payload.advertisements,
      }
    case FETCH_ONE_ADS_START:
      return {
        ...state,
        oneLoading: true,
        oneError: null,
      }
    case FETCH_ONE_ADS_FAILED:
      return {
        ...state,
        oneLoading: false,
        oneError: action.payload.error
      }
    case FETCH_ONE_ADS_SUCCESS:
      return {
        ...state,
        oneLoading: false,
        oneError: null,
        ads: [...state.ads.filter(ad => ad._id !== action.payload.advertisement._id), action.payload.advertisement]
      }
      
    case FETCH_ADS_START:
      return {
        loading: true,
        error: null,
        total: 0,
        ads: []
      }
    case FETCH_ADS_SUCCESS:
      return {
        loading: false,
        error: null,
        total: action.payload.total,
        ads: action.payload.advertisements,
      }
    case FETCH_ADS_FAILED:
      return {
        loading: false,
        error: action.payload.error,
        total: 0,
        ads: []
      }
    default:
      return state
  }
}

const initialOwnState = {
  //This is for loading one ad
  oneLoading: true,
  oneError: false,
  //This is for loading all ad
  loading: false,
  error: null,
  total: 0,
  ads: []
}

export function ownAdReducer(state = initialOwnState, action) {
  switch(action.type) {
    case FETCH_OWN_ADS_START:
      return {
        loading: true,
        error: null,
        total: 0,
        ads: []
      }
    case FETCH_OWN_ADS_SUCCESS:
      return {
        loading: false,
        error: null,
        total: action.payload.total,
        ads: action.payload.advertisements,
      }
    case FETCH_OWN_ADS_FAILED:
      return {
        loading: false,
        error: action.payload.error,
        total: 0,
        ads: []
      }
    case FETCH_ONE_ADS_START:
      return {
        ...state,
        oneLoading: true,
        oneError: null,
      }
    case FETCH_ONE_ADS_FAILED:
      return {
        ...state,
        oneLoading: false,
        oneError: action.payload.error
      }
    case FETCH_ONE_ADS_SUCCESS:
      return {
        ...state,
        oneLoading: false,
        oneError: null,
        ads: [...state.ads.filter(ad => ad._id !== action.payload.advertisement._id), action.payload.advertisement]
      }
    default:
      return state
  }
}