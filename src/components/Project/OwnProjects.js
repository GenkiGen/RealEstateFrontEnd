import React from 'react'
import { fetchOwnProjects } from '../../redux/actions/project'
import { connect } from 'react-redux'
import Project from './AProject'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router-dom'

class OwnProjects extends React.Component {
  constructor(props) {
    super(props)
    this.onPageClick = this.onPageClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchOwnProjects()
  }

  onPageClick(page) {
    this.props.fetchOwnProjects(page)
  }

  render() {
    const { projects, loading, error, total } = this.props
    return (
      <div className="card" style={{marginTop: "10px"}}>
        <div className="card-header">
          <div className="card-header-title">
            <h1 className="heading has-text-info is-3">Your projects</h1>
          </div>
        </div>

        <div className="card-content">
        {
          loading ? <h1 className="heading is-5">Loading...</h1> :
            error ? <h1>{error.toString()}</h1> :
              <React.Fragment>
              <Link to="/projects/add" className="has-text-link">Add a project</Link>
              {
                projects.map(project => <Project project={project} key={project.title}/>)
              }
              </React.Fragment>
        }
        </div>

        <Pagination total={total} per_page={5} onPageClick={this.onPageClick}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.own.projects,
    loading: state.projects.own.loading,
    error: state.projects.own.loading,
    total: state.projects.own.total
  }
}

export default connect(mapStateToProps, { fetchOwnProjects })(OwnProjects)