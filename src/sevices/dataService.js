const axios = require('axios')

export function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8080/authenticate', {
      name: username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => resolve(resp.data))
    .catch(error => reject(error))
  })
}