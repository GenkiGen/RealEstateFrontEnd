import React from 'react'
import { connect } from 'react-redux'
import service from '../../sevices/dataService'
import { getOwnAds, getOneAd } from '../../redux/actions'
import { fetchOneProject } from '../../redux/actions/project'
import ProjectForm from './ProjectForm'
import Pagination from '../Pagination/Pagination'

class EditProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      operationPending: false
    }
    this.addAdver = this.addAdver.bind(this)
    this.removeAdver = this.removeAdver.bind(this)
    this.editProject = this.editProject.bind(this)
    this.onPageClick = this.onPageClick.bind(this)
  }

  componentDidMount() {
    if (!this.props.project)
      this.props.fetchOneProject(this.props.match.params.id)
    if (this.props.ads.length === 0)
      this.props.getOwnAds()
  }

  editProject(event) {
    const { userId, project } = this.props
    event.preventDefault()
    const formData = new FormData(event.target)
    const update = {
      title: formData.get("title"),
      type: formData.get("type"),
      ownerName: formData.get("ownerName"),
      size: formData.get("size"),
      startYear: formData.get("startYear"),
      endYear: formData.get("endYear"),
      userId: userId
    }
    service.updateProject(project._id, update)
          .then(resp => {
            alert('Success')
            this.props.fetchOneProject(project._id)
          })
          .catch(error => {
            alert('Error')
          })
  }

  addAdver(adId) {
    const { project } = this.props
    this.setState({
      operationPending: true
    })
    service.addAdToProject(project._id, adId)
          .then(_ => { 
            this.setState({
              operationPending: false
            })
            this.props.getOneAd(adId)
          })
          .catch(error => { 
            this.setState({
              operationPending: false
            })
          })
  }

  removeAdver(adId) {
    const { project } = this.props
    this.setState({
      operationPending: true
    })
    service.removeAdFromProject(project._id , adId)
          .then(_ => {
            console.log(_)
            this.setState({
              operationPending: false
            })
            this.props.getOneAd(adId)
          })
          .catch(error => {
            const { status, data } = error.response
            if (status === 400) {
              alert(data.message)
            } else {
              alert("An unknown error has occured, please try again")
            }
            this.setState({
              operationPending: false
            }) 
          })
  }

  onPageClick(page) {
    this.props.getOwnAds(page)
  }

  render() {
    const { ads, project, total } = this.props
    const { operationPending } = this.state
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <h1 className="card-header-title">Edit project's details</h1>
          </div>
          <div className="card-content">
            <ProjectForm project={project} submitButton={"Update"} onSubmit={this.editProject}/>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">Edit project's advertisements</div>
          </div>

          <div className="card-content">
          {
            ads.map(ad => <div key={ad._id} className="card card-content">
              { ad.title }
              {
                operationPending ?
                <button className="button is-loading is-primary is-pulled-right">Add</button> :
                ad.projectId ? 
                ad.projectId === project._id ? 
                <button className="button is-danger is-pulled-right" onClick={() => this.removeAdver(ad._id)}>Remove</button> :
                <button className="button is-pulled-right">Unavailable</button> :
                <button className="button is-primary is-pulled-right" onClick={() => this.addAdver(ad._id)}>Add</button>
              }
              </div>)
          }
          </div>

          <Pagination total={total} per_page={5} onPageClick={this.onPageClick} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.user,
    project: state.projects.own.projects.find(
      proj => proj._id === ownProps.match.params.id),
    ads: state.ownAdvertisements.ads,
    total: state.ownAdvertisements.total,
    isAdsError: state.ownAdvertisements.error,
    isAdsLoading: state.ownAdvertisements.loading
  }
}

export default connect(mapStateToProps, { getOwnAds, getOneAd, fetchOneProject })(EditProject)