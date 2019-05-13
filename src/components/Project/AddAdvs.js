import React from 'react'
import { connect } from 'react-redux'
import Advertisement from '../Home/APost'
import Pagination from '../Pagination/Pagination'

class AllAdvertisements extends React.Component {
  constructor(props) {
    super(props)
    this.onPageClick = this.onPageClick.bind(this)
    this.state = {
      currentPage: 0
    }
  }

  componentDidMount() {
    this.props.getOwnAds(0)
  }

  onPageClick(page) {
    this.props.getOwnAds(page)
    this.setState({
      currentPage: page
    })
  }

  render() {
    const { ads, error, loading, total } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">
            <h1 className="heading has-text-info is-3">All advertisements</h1>
          </div>
        </div>

        <div className="card-content">
          {
            loading ? <h1 className="title is-5 has-text-info">Loading ads</h1> :
              error ? <h1 className="title is-5 has-text-danger">Error encountered</h1> :
                <React.Fragment>
                  {
                    ads.map((ad, index) => <Advertisement ad={ad} key={index} />)
                  }
                </React.Fragment>
          }
          <Pagination total={total} per_page={5} onPageClick={this.onPageClick} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.advertisements.loading,
    error: state.advertisements.error,
    ads: state.advertisements.ads,
    total: state.advertisements.total
  }
}

export default connect(mapStateToProps, { fetchAdverstisements })(AllAdvertisements)