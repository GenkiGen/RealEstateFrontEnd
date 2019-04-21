import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './Login/Login'
import PrivateRoute from '../router/PrivateRoute'
import Homepage from './Home/Homepage'
import Signup from './Signup/Signup';


const App = () => {
  return (
      <Switch>
        <PrivateRoute exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup} />
      </Switch>
  )
}

export default App