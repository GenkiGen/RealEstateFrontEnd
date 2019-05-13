import axios from 'axios'
import auth from '../sevices/authService'
import history from '../router/history'

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://103.130.212.103:9090/authenticate', {
      name: username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.data)
    .then(data => {
      auth.login(data.data.accessToken)
      return data
    })
    .then(data => resolve(data))
    .catch(error => handleResponse(error, reject))
  })
}

function register(username, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://103.130.212.103:9090/users', {
      name: username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resp.data)
    .then(data => {
      auth.login(data.data.accessToken)
      return data
    })
    .then(data => resolve(data))
    .catch(error => { 
      reject(error) 
    })
  })
}


//Advertisement
function getAllAdvertisements(page, sort, filter) {
  const filterObject = filter ? {
    filter: filter.filter,
    gte: filter.from,
    lte: filter.to
  } : {}
  const sortObject = sort ? {
    sort: sort.sort,
    order: sort.order
  } : {}
  return new Promise((resolve, reject) => {
    axios.get('http://103.130.212.103:9090/advertisements', {
      params: { 
        p: page,
        ...filterObject,
        ...sortObject
      }
    })
         .then(resp => resp.data)
         .then(data => resolve(data))
         .catch(error => reject(error))
  })
}

function getOwnAdvertisement(page) {
  return new Promise((resolve, reject) => {
    axios.get('http://103.130.212.103:9090/advertisements/me', {
      params: { p: page },
      headers: auth.getAuthHeader()
    })
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

function getOneAdvertisement(id) {
  return new Promise((resolve, reject) => {
    axios.get(`http://103.130.212.103:9090/advertisements/${id}`, {
      headers: auth.getAuthHeader()
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function deleteAd(_id) {
  return new Promise((resolve, reject) => {
    axios.delete('http://103.130.212.103:9090/advertisements', {
      headers: auth.getAuthHeader(),
      data: {
        _id
      }
    })
    .then(data => resolve(data.message))
    .catch(error => reject(error))
  })
}

function addAdvertisement(advertisement) {
  return new Promise((resolve, reject) => {
    axios.post('http://103.130.212.103:9090/advertisements', advertisement, {
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

function updateAdvertisement(advertisement) {
  return new Promise((resolve, reject) => {
    axios.put('http://103.130.212.103:9090/advertisements', advertisement, {
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}

//User
function getUserInfo() {
  return new Promise((resolve, reject) => {
    axios.get('http://103.130.212.103:9090/users/me', {
      headers: auth.getAuthHeader()
    })
    .then(resp => { 
      resolve(resp.data) 
    })
    .catch(error => handleResponse(error, reject))
  })
}

function logout() {
  auth.logout()
  history.push('/login')
}

//Projects
function addProject(project) {
  return new Promise((resolve, reject) => {
    axios.post('http://103.130.212.103:9090/projects', project, {
    headers: {
      "Content-Type": "application/json",
      ...auth.getAuthHeader()
    }
  })
  .then(resp => resolve(resp.data))
  .catch(error => handleResponse(error, reject))
  })
}

function fetchOwnProjects(page) {
  return new Promise((resolve, reject) => {
    axios.get("http://103.130.212.103:9090/projects/me", {
      headers: auth.getAuthHeader(),
      params: {
        page
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function updateProject(projectId, update) {
  return new Promise((resolve, reject) => {
    axios.put(`http://103.130.212.103:9090/projects/${projectId}`, update, {
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function fetchOneProject(projectId) {
  return new Promise((resolve, reject) => {
    axios.get(`http://103.130.212.103:9090/projects/${projectId}`, {
      headers: auth.getAuthHeader()
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function addAdToProject(projectId, adId) {
  return new Promise((resolve, reject) => {
    axios.post(`http://103.130.212.103:9090/projects/${projectId}/addAdvertisement`, {
      adId
    }, 
    {
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function removeAdFromProject(projectId, adId) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://103.130.212.103:9090/projects/${projectId}/removeAdvertisement`, {
      headers: {
        'Content-Type': 'application/json',
        ...auth.getAuthHeader()
      },
      data: {
        adId
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function removeProject(projectId) {
  return new Promise((resolve, reject) => {
    axios.delete(`http://103.130.212.103:9090/projects/${projectId}`, {
      headers: auth.getAuthHeader()
    })
    .then(resp => resolve(resp.data))
    .catch(error => handleResponse(error, reject))
  })
}

function handleResponse(error, reject) {
  console.log(error.status)
  const { status } = error.response
  if (status === 302) {
    logout()
  } else {
    reject(error)
  }
}

export default {
  login,
  logout,
  register,
  getAllAdvertisements,
  getOwnAdvertisement,
  getOneAdvertisement,
  deleteAd,
  addAdvertisement,
  removeAdFromProject,
  updateAdvertisement,
  addAdToProject,
  fetchOwnProjects,
  fetchOneProject,
  removeProject,
  updateProject,
  addProject,
  getUserInfo
}