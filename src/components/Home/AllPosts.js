import React from 'react'
import { connect } from 'react-redux'
import { fetchAdverstisements } from '../../redux/actions'

class AllAdvertisements extends React.Component {
  componentDidMount() {
    this.props.fetchAdverstisements()
  }

  render() {
    const { loading, error, ads } = this.props
    return (
      <div className="ads">
      <h1 className="title">All real estates</h1>
      {
        loading ? <h1 className="title is-5 has-text-info">Loading ads</h1> :
          error ? <h1 className="title is-5 has-text-danger">Error encountered</h1> :
            <React.Fragment>
              {
                ads.map(ad => <div className="card card-content">
                {
                  ad.title
                }
                </div>)
              }
            </React.Fragment>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.advertisements.loading,
    error: state.advertisements.error,
    ads: state.advertisements.ads
  }
}

export default connect(mapStateToProps, { fetchAdverstisements })(AllAdvertisements)