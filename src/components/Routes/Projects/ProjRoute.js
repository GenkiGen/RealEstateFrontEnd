import { Switch, Route } from 'react-router-dom'
import AddProject from '../../Project/AddProject'
import React from 'react'
import EditProject from '../../Project/EditProject'

const ProjectRoute = () => {
  return (
    <div className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <Switch>
            <Route path="/projects/add" component={AddProject}/>
            <Route path="/projects/:id/addAdvertisement" component={EditProject}/>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default ProjectRoute