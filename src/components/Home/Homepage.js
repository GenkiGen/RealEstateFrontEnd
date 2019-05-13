import React from 'react'
import { logout, getUserInfo } from '../../redux/actions'
import { connect } from 'react-redux'
import AllPosts from './AllPosts';
import AddAd from '../Advertisement/AddAd';
import OwnProjects from '../Project/OwnProjects';

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount() {
    this.props.getUserInfo()
  }

  onLogout() {
    this.props.logout()
  }

  render() {
    const { user, loading } = this.props
    return (
      loading ? <h1 className="title is-danger">Wait a minute</h1> : 
      <div className="hero is-fullheight is-warning" style={{padding: "10px"}}>
        <h1 className="title is-info">Welcome, {user.name}</h1>
        <button className="button is-info" onClick={this.onLogout} style={{marginBottom: "10px"}}>Logout</button>
        <div className="columns">
          <div className="column is-half">
            <AddAd />
          </div>
          <div className="column is-half">
            <AllPosts authorized={true}/>
            <OwnProjects />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.auth.gettingInfo
  }
}

export default connect(mapStateToProps, { logout, getUserInfo })(Homepage)