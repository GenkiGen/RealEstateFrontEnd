import ReactDOM from 'react-dom'
import React from 'react'
import App from './components/App'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './router/history'

window.store = store
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
  , document.querySelector("#root"))