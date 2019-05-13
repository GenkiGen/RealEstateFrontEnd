import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PrivateRoute from '../router/PrivateRoute'
import Homepage from './Home/Homepage'
import AdRoutes from './Routes/Advertisements/AdRoutes'
import ProjectRoute from './Routes/Projects/ProjRoute'
import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'


const App = () => {
  return (
      <Switch>
        <PrivateRoute exact path="/" component={Homepage} />
        <Route path="/advertisements" component={AdRoutes} />
        <Route path="/projects" component={ProjectRoute}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
  )
}

export default App