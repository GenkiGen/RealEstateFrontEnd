import axios from 'axios'
import auth from '../sevices/authService'
import history from '../router/history'

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/authenticate', {
      name: username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(handleResponse)
    .then(data => {
      auth.login(data.data.accessToken)
      return data
    })
    .then(data => resolve(data))
    .catch(error => reject(error))
  })
}

function register(username, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/users', {
      name: username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => { console.log(resp); return resp.data })
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

function getAllAdvertisements() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8080/advertisements')
         .then(resp => resp.data)
         .then(data => resolve(data))
         .catch(error => reject(error))
  })
}

function logout() {
  auth.logout()
  history.push('/login')
}

function handleResponse(resp) {
  if (resp.status === 200) {
    return resp.data
  } else {
    auth.logout()
    history.push('/login')
  }
}

export default {
  login,
  logout,
  register,
  getAllAdvertisements
}