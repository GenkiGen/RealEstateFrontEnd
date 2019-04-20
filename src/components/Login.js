import React from 'react'

const Login = () => {
  return (
    <div className="card" style={{width: "50%", margin: "0 auto"}}>
      <div className="card-header">
        <div className="card-header-title">Login</div>
      </div>
      <div className="card-content">
        <form>
          <div className="field">
            <label className="label" htmlFor="name">Username</label>
            <input className="input is-rounded is-primary" type="text" name="name"></input>
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input className="input is-rounded is-primary" type="password" name="password"></input>
          </div>

          <input type="submit" className="button is-info" value="Log in"/>
        </form>
      </div>
    </div>
  )
}

export default Login