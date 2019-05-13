import service from '../../sevices/dataService'
import { getOwnAds } from '../../redux/actions/index'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

const Advertisement = ({ getOwnAds, ad, authorized=false }) => {
  function onDelete() {
    if (window.confirm('Do you want to delete this item ?')) {
      service.deleteAd(ad._id)
             .then(data => {
               alert('Advertisement deleted')
               getOwnAds()
             })
             .catch(error => alert('Please try again'))
    }
  }

  return (
    <div className="card card-content">
      <Link to={`/advertisements/${ad._id}`}>{ ad.title }</Link>
      <div className="buttons has-addons is-left">

        {
          authorized ? 
          <React.Fragment>
            <button className="button is-danger"
                  onClick={onDelete}>
              Delete
            </button>

            <Link className="button is-warning"
                  to={`/advertisements/${ad._id}/update`}>
              Update
            </Link>
          </React.Fragment> : null
        }
      </div>
    </div>
  )
}

export default connect(null, { getOwnAds })(Advertisement)