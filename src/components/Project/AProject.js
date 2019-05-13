import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOwnProjects } from '../../redux/actions/project'
import service from '../../sevices/dataService'

const Project = ({ project, fetchOwnProjects }) => {
  function onDelete() {
    if (window.confirm('Do you want to delete this project')) {
      service.removeProject(project._id)
            .then(resp => {
              alert('Project has been deleted')
              fetchOwnProjects()
            })
            .catch(err => {
              alert('Error occurred, Please try again')
            })
    }
  }

  return (
    <div className="card card-content">
    {
      project.title
    }
    <br />
    <Link to={`/projects/${project._id}/addAdvertisement`}
          className="button is-warning is-left">Manage ads</Link>
    <button className="button is-danger is-left" onClick={onDelete}>Delete</button>
    </div>
  )
}

export default connect(null, { fetchOwnProjects })(Project)