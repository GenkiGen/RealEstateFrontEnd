import { 
  FETCH_OWN_PROJECTS_START,
  FETCH_OWN_PROJECTS_FAILED,
  FETCH_OWN_PROJECTS_SUCCESS,
  FETCH_ONE_PROJ_START,
  FETCH_ONE_PROJ_FAILED,
  FETCH_ONE_PROJ_SUCCESS
} from '../constants/action-types'
import service from '../../sevices/dataService'

export function fetchOneProject(projectId) {
  function start() {
    return {
      type: FETCH_ONE_PROJ_START
    }
  }

  function success(payload) {
    return {
      type: FETCH_ONE_PROJ_SUCCESS,
      payload
    }
  }

  function failed(payload) {
    return {
      type: FETCH_ONE_PROJ_FAILED,
      payload
    }
  }

  return function(dispatch) {
    dispatch(start())
    service.fetchOneProject(projectId)
          .then(resp => { 
            dispatch(success({ project: resp.data })) 
          })
          .catch(error => dispatch(failed({ error })))
  }
}

export function fetchOwnProjects(page) {
  return function(dispatch) {
    dispatch(start())
    service.fetchOwnProjects(page)
          .then(resp => { 
            dispatch(success({ projects: resp.data.projects, total: resp.data.total })) 
          })
          .catch(error => dispatch(failed({ error })))
  }       

  function start() {
    return {
      type: FETCH_OWN_PROJECTS_START
    }
  }

  function success(payload) {
    return {
      type: FETCH_OWN_PROJECTS_SUCCESS,
      payload
    }
  }

  function failed(payload) {
    return {
      type: FETCH_OWN_PROJECTS_FAILED,
      payload
    }
  }
}
