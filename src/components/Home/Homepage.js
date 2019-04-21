import React from 'react'
import { logout } from '../../redux/actions'
import { connect } from 'react-redux'
import AllPosts from './AllPosts';

const Homepage = ({ userId, logout }) => {
  function onLogout() {
    logout()
  }

  return (
    <div className="container" style={{padding: "10px"}}>
      <button className="button is-warning" onClick={onLogout}>Logout</button>
      <AllPosts />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, { logout })(Homepage)