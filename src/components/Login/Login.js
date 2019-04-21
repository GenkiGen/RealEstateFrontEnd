import React from 'react'
import { login } from '../../redux/actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Login = ({ authFailed, loggingIn, loggedIn, login }) => {
  function onLogin(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    login(data.get("name"), data.get("password"))
  }

  return (
    <div className="card" style={{width: "50%", margin: "0 auto"}}>
      {
        loggingIn ? <h1 className="title is-3 has-text-primary">Loading</h1> :
        <React.Fragment>
          <div className="card-header">
            <div className="card-header-title">Login</div>
          </div>
          <div className="card-content">
            {
              authFailed ? <h1 className='heading has-text-danger'>Authentication error</h1> : null
            }
            <form onSubmit={onLogin}>
              <div className="field">
                <label className="label" htmlFor="name">Username</label>
                <input className="input is-rounded is-primary" type="text" name="name"></input>
              </div>

              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <input className="input is-rounded is-primary" type="password" name="password"></input>
              </div>
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
              <input type="submit" className="button is-info" value="Log in"/>
            </form>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggingIn: state.auth.loggingIn,
    loggedIn: state.auth.loggedIn,
    authFailed: state.auth.authFailed
  }
}

export default connect(mapStateToProps, { login })(Login)