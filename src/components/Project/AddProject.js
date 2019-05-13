import React from 'react'
import { connect } from 'react-redux'
import service from '../../sevices/dataService'
import ProjectForm from './ProjectForm';

class AddProject extends React.Component {
  constructor(props) {
    super(props)
    this.onAdd = this.onAdd.bind(this)
    this.handleError = this.handleError.bind(this)
    this.state = {
      submitted: false,
      success: false,
      error: null
    }
  }

  onAdd(event) {
    const { userId } = this.props
    event.preventDefault()
    const formData = new FormData(event.target)
    const project = {
      title: formData.get("title"),
      type: formData.get("type"),
      ownerName: formData.get("ownerName"),
      size: formData.get("size"),
      startYear: formData.get("startYear"),
      endYear: formData.get("endYear"),
      userId: userId
    }
    service.addProject(project)
          .then(resp => {
            this.setState({
              submitted: true,
              success: true,
              error: null
            })
          })
          .catch(error => this.handleError(error))
  }

  handleError(error) {
    const { data, status } = error.response
    if (status === 301) {
      this.setState({
        submitted: true,
        success: false,
        error: data.message
      })
    } else {
      this.setState({
        submitted: true,
        success: false,
        error: "Unknown error occurred"
      })
    }
  }

  render() {
    const { submitted, error, success } = this.state
    return (
      <React.Fragment>
        <h1 className="title has-text-white is-3">Add a project</h1>
        {
          submitted ? success ? <h1 className="title has-text-success is-3">New project added</h1> : <h1 className="heading has-text-danger is-3">{error}</h1> : null
        }
        <ProjectForm onSubmit={this.onAdd} submitButton={"Add project"}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user
  }
}

export default connect(mapStateToProps)(AddProject)