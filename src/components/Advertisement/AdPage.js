import React from 'react'
import { connect } from 'react-redux'
import { getOneAd } from '../../redux/actions'

class AdPage extends React.Component {
  componentDidMount() {
    const { ad } = this.props
    if (!ad) {
      this.props.getOneAd(this.props.match.params.id)
    }
  }

  render() {
    const { ad } = this.props
    return (
      ad ?
        <div className="card">
        <div className="card-header">
          <p className="card-header-title">Advertisement for: {ad.title}</p>
        </div>
        <div className="card-content">
          <div className="columns">
            <div className="column is-half">
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Details</p>
                </div>
                <div className="card-content">
                  <p>Price: {ad.price}</p>
                  <p>Size: {ad.size}</p>
                  <p>Number of bedrooms: {ad.totalBedrooms}</p>
                  <p>Number of floors: {ad.totalFloors}</p>
                  <p>Direction: {ad.direction}</p>
                </div>
              </div>
            </div>

            <div className="column is-half">
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Contact's information</p>
                </div>
                <div className="card-content">
                  <p>Owner's name: {ad.contact.name}</p>
                  <p>Owner's contact: {ad.contact.phone}</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Location</p>
                </div>
                <div className="card-content">
                  <p>Street: {ad.address.street}</p>
                  <p>District: {ad.address.district}</p>
                  <p>City: {ad.address.city}</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Available Until</p>
                </div>
                <div className="card-content">
                  {new Date(ad.expDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : <h1 className="title is-info">Loading data...</h1>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ad: state.advertisements.ads.find(ad => ad._id === ownProps.match.params.id)
  }
}

export default connect(mapStateToProps, { getOneAd })(AdPage)