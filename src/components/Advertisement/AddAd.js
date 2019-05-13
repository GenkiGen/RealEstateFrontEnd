import React from 'react'
import { connect } from 'react-redux'
import { getOwnAds } from '../../redux/actions'
import service from '../../sevices/dataService'

class AddAd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      success: false,
      error: null
    }
    this.handleError = this.handleError.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const adData = {
      title: formData.get("name"),
      price: formData.get("price"),
      size: formData.get("size"),
      totalBedrooms: formData.get("totalBedrooms"),
      totalFloors: formData.get("totalFloors"),
      direction: formData.get("direction"),
      ownerName: formData.get("ownerName"),
      ownerPhone: formData.get("ownerPhone"),
      district: formData.get("district"),
      street: formData.get("district"),
      city: formData.get("city"),
      expDate: formData.get("expDate"),
      userId: this.props.user.userId
    }
    service.addAdvertisement(adData)
           .then(_ => {
              this.setState({
                submitted: true,
                success: true,
                error: null
              }, () => this.props.getOwnAds())
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
    const { submitted, success, error } = this.state
    return (
      <React.Fragment>
        {
          submitted ? (success ? <h1 className="title has-text-primary is-5">New advertisement added</h1> : <h1 className="title has-text-danger is-5">Warning, {error}</h1>) : null
        }
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Estate name:</label>
            <input type="text" className="input is-primary" name="name"></input>
          </div>

          <div className="field">
            <label className="label">Estate price:</label>
            <input type="number" className="input is-primary" name="price"></input>
          </div>

          <div className="field">
            <label className="label">Estate size:</label>
            <input type="number" className="input is-primary" name="size"></input>
          </div>

          <div className="field">
            <label className="label">Total bedrooms:</label>
            <input type="text" className="input is-primary" name="totalBedrooms"></input>
          </div>

          <div className="field">
            <label className="label">Total floors:</label>
            <input type="text" className="input is-primary" name="totalFloors"></input>
          </div>

          <div className="field">
            <label className="label">Direction</label>
            <div className="select">
              <select name="direction">
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Owner's name:</label>
            <input type="text" className="input is-primary" name="ownerName"></input>
          </div>

          <div className="field">
            <label className="label">Owner's contact:</label>
            <input type="text" className="input is-primary" name="ownerPhone"></input>
          </div>

          <div className="field">
            <label className="label">Street:</label>
            <input type="text" className="input is-primary" name="street"></input>
          </div>

          <div className="field">
            <label className="label">District:</label>
            <input type="text" className="input is-primary" name="district"></input>
          </div>

          <div className="field">
            <label className="label">City:</label>
            <input type="text" className="input is-primary" name="city"></input>
          </div>

          <div className="field">
            <label className="label">Available until:</label>
            <input type="date" className="input is-primary" name="expDate"></input>
          </div>

          <input className="button is-primary" type="submit" value="Add advertisement" />
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { getOwnAds })(AddAd)