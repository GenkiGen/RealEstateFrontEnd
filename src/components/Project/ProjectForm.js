import React from 'react'

const ProjectForm = ({ onSubmit=f=>f, project, submitButton }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <input type="text" className="input is-primary" name="title" defaultValue={project ? project.title : null}/>
      </div>

      <label className="label">Type</label>
      <div className="select">
        <select name="type" defaultValue={project ? project.type : null}>
          <option>House</option>
          <option>Apartment</option>
          <option>Land</option>
        </select>
      </div>

      <div className="field">
        <label className="label">Owner's name</label>
        <input type="text" className="input is-primary" name="ownerName" defaultValue={project ? project.ownerName: null}/>
      </div>

      <div className="field">
        <label className="label">Project's size</label>
        <input type="number" className="input is-primary" name="size" defaultValue={project ? project.size : null}/>
      </div>

      <div className="field">
        <label className="label">Start year</label>
        <input type="number" className="input is-primary" name="startYear" defaultValue={project ? project.startYear : null}/>
      </div>

      <div className="field">
        <label className="label">End year</label>
        <input type="number" className="input is-primary" name="endYear" defaultValue={project ? project.endYear : null}/>
      </div>

      <input type="submit" className="button is-primary is-rounded" value={submitButton}/>
    </form>
  )
}

export default ProjectForm