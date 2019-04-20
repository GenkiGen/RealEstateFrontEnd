import ReactDOM from 'react-dom'
import React from 'react'
import App from './components/App'
import { login } from './sevices/dataService';

login('John', 'Rm!t201278')
  .then(data => console.log(data))
  .catch(error => console.log(error))
ReactDOM.render(<App/>, document.querySelector("#root"))