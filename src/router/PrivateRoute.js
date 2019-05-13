import { Route, Redirect } from 'react-router-dom'
import auth from '../sevices/authService'
import React from 'react'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      return auth.isLoggedIn() ? <Component {...props}/>:<Redirect to="/login"/>
    }}/>
  )
}

export default PrivateRoute