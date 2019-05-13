import { 
  MODIFY_SORT,
  MODIFY_SORT_ORDER,
  MODIFY_FILTER,
  MODIFY_FILTER_RANGE
 } from '../constants/action-types'

const initialState = {
  sort: 'price',
  order: 'asc',
  filter: null,
  from: 0,
  to: 0
}

export default function viewReducer(state = initialState, action) {
  switch(action.type) {
    case MODIFY_SORT:
      return {
        ...state,
        sort: action.payload.sort
      }
    case MODIFY_SORT_ORDER: 
      return {
        ...state,
        order: action.payload.order
      }
    case MODIFY_FILTER:
      return {
        ...state,
        filter: action.payload.field
      }
    case MODIFY_FILTER_RANGE:
      return {
        ...state,
        from: action.payload.from,
        to: action.payload.to
      }
    default:
      return state
  }
}