function login(token) {
  localStorage.setItem("accessToken", token)
}

function logout() {
  localStorage.removeItem("accessToken")
}

function isLoggedIn() {
  return localStorage.getItem("accessToken")
}

function getToken() {
  return localStorage.getItem("accessToken")
}

function getAuthHeader() {
  return {
    'x-access-token': localStorage.getItem("accessToken")
  }
}

export default {
  login,
  logout,
  getAuthHeader,
  isLoggedIn,
  getToken
}