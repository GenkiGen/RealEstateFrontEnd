import React from 'react'
import { signup } from '../../redux/actions'
import { connect } from 'react-redux'

const Signup = ({ signingUp, error, signup }) => {
  function onSignup(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    signup(data.get("name"), data.get("password"))
  }

  return (
    <div className="card" style={{width: "50%", margin: "0 auto"}}>
      {
        signingUp ? <h1 className="title is-3 has-text-primary">Loading</h1> :
        <React.Fragment>
          <div className="card-header">
            <div className="card-header-title">Sign up</div>
          </div>
          <div className="card-content">
            {
              error ? <h1 className='heading has-text-danger'>{error.toString()}</h1> : null
            }
            <form onSubmit={onSignup}>
              <div className="field">
                <label className="label" htmlFor="name">Username</label>
                <input className="input is-rounded is-primary" type="text" name="name"></input>
              </div>

              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <input className="input is-rounded is-primary" type="password" name="password"></input>
              </div>

              <input type="submit" className="button is-info" value="Sign up"/>
            </form>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

const mapStateToProp = state => {
  return {
    signingUp: state.registration.signingUp,
    error: state.registration.error
  }
}

export default connect(mapStateToProp, { signup })(Signup)