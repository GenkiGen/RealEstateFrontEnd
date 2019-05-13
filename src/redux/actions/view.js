import { 
  MODIFY_SORT,
  MODIFY_SORT_ORDER,
  MODIFY_FILTER,
  MODIFY_FILTER_RANGE
 } from '../constants/action-types'

export function modifySort(payload) {
  return {
    type: MODIFY_SORT,
    payload
  }
}

export function modifySortOrder(payload) {
  return {
    type: MODIFY_SORT_ORDER,
    payload
  }
}

export function modifyFilter(payload) {
  return {
    type: MODIFY_FILTER,
    payload
  }
}

export function modifyFilterRange(payload) {
  return {
    type: MODIFY_FILTER_RANGE,
    payload
  }
}