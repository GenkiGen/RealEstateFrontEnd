import React from 'react'
import { connect } from 'react-redux'
import { getOwnAds } from '../../redux/actions'
import Advertisement from './APost';
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router-dom'

class AllAdvertisements extends React.Component {
  constructor(props) {
    super(props)
    this.onPageClick = this.onPageClick.bind(this)
  }

  componentDidMount() {
    this.props.getOwnAds()
  }

  onPageClick(page) {
    this.props.getOwnAds(page)
  }

  render() {
    const { loading, error, ads, total, authorized=false } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">
            <h1 className="heading has-text-info is-3">Your advertisements</h1>
          </div>
        </div>

        <div className="card-content">
        {
          loading ? <h1 className="title is-5 has-text-info">Loading ads</h1> :
            error ? <h1 className="title is-5 has-text-danger">Error encountered</h1> :
              <React.Fragment>
                <Link to="/advertisements" className="has-text-link">View all</Link>
                {
                  ads.map((ad, index) => <Advertisement ad={ad} key={index} authorized={authorized}/>)
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
    loading: state.ownAdvertisements.loading,
    total: state.ownAdvertisements.total,
    error: state.ownAdvertisements.error,
    ads: state.ownAdvertisements.ads
  }
}

export default connect(mapStateToProps, { getOwnAds })(AllAdvertisements)