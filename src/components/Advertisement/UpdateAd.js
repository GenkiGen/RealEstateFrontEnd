import React from 'react'
import { connect } from 'react-redux'
import service from "../../sevices/dataService"
import { getOwnAds, fetchAdverstisements, getOneAd } from '../../redux/actions'

class UpdateAdvertisement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      success: false,
      error: null
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    if (!this.props.ad) {
      console.log('Go and get ad')
      this.props.getOneAd(id)
    }
  }

  onUpdate(event) {
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
      _id: this.props.ad._id
    }
    service.updateAdvertisement(adData)
           .then(_ => {
              this.setState({
                submitted: true,
                success: true,
                error: null
              }, () => { 
                this.props.getOwnAds()
                this.props.fetchAdverstisements() 
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
    const { ad, loading, err } = this.props
    const { submitted, success, error } = this.state
    return (
      loading ? <h1 className="title has-text-info is-3">Loading advertisement...</h1> : err ? <h1 className="title has-text-info is-3">Error occured</h1> :
      <React.Fragment>
        <h1 className="title is-3 has-text-white">Update advertisement</h1>
        {
          submitted ? (success ? <h1 className="title has-text-info is-3">Advertisement updated</h1> : <h1 className="heading has-text-danger is-3">Warning, {error}</h1>) : null
        }
        <form onSubmit={this.onUpdate}>
          <div className="field">
            <label className="label">Estate name:</label>
            <input type="text" className="input is-primary" name="name" defaultValue={ad.title}></input>
          </div>

          <div className="field">
            <label className="label">Estate price:</label>
            <input type="number" className="input is-primary" name="price" defaultValue={ad.price}></input>
          </div>

          <div className="field">
            <label className="label">Estate size:</label>
            <input type="number" className="input is-primary" name="size" defaultValue={ad.size}></input>
          </div>

          <div className="field">
            <label className="label">Total bedrooms:</label>
            <input type="text" className="input is-primary" name="totalBedrooms" defaultValue={ad.totalBedrooms}></input>
          </div>

          <div className="field">
            <label className="label">Total floors:</label>
            <input type="text" className="input is-primary" name="totalFloors" defaultValue={ad.totalFloors}></input>
          </div>

          <div className="field">
            <label className="label">Direction</label>
            <div className="select">
              <select name="direction" defaultValue={ad.direction}>
                <option value="North">North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Owner's name:</label>
            <input type="text" className="input is-primary" name="ownerName" defaultValue={ad.contact.name}></input>
          </div>

          <div className="field">
            <label className="label">Owner's contact:</label>
            <input type="text" className="input is-primary" name="ownerPhone" defaultValue={ad.contact.phone}></input>
          </div>

          <div className="field">
            <label className="label">Street:</label>
            <input type="text" className="input is-primary" name="street" defaultValue={ad.address.street}></input>
          </div>

          <div className="field">
            <label className="label">District:</label>
            <input type="text" className="input is-primary" name="district" defaultValue={ad.address.district}></input>
          </div>

          <div className="field">
            <label className="label">City:</label>
            <input type="text" className="input is-primary" name="city" defaultValue={ad.address.city}></input>
          </div>

          <div className="field">
            <label className="label">Available until:</label>
            <input type="date" className="input is-primary" name="expDate" defaultValue={ad.expDate.slice(0, 10)}></input>
          </div>

          <input className="button is-primary" type="submit" value="Update advertisement" />
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ad: state.ownAdvertisements.ads.find(adv => adv._id === ownProps.match.params.id),
    loading: state.ownAdvertisements.oneLoading,
    error: state.ownAdvertisements.oneError
  }
}

export default connect(mapStateToProps, { getOwnAds, fetchAdverstisements, getOneAd })(UpdateAdvertisement)