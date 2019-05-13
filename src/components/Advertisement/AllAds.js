import React from 'react'
import { connect } from 'react-redux'
import { fetchAdverstisements } from '../../redux/actions'
import Advertisement from '../Home/APost'
import Pagination from '../Pagination/Pagination'
import SortBox from '../Sort/Composition'
import FilterBox from '../Filter/Composition'

class AllAdvertisements extends React.Component {
  constructor(props) {
    super(props)
    this.onPageClick = this.onPageClick.bind(this)
    this.state = {
      currentPage: 0
    }
  }

  componentDidMount() {
    this.props.fetchAdverstisements(0, this.props.sort, this.props.filter.filter ? this.props.filter : null)
  }

  onPageClick(page) {
    this.props.fetchAdverstisements(page, this.props.sort, this.props.filter.filter ? this.props.filter : null)
    this.setState({
      currentPage: page
    })
  }

  render() {
    const { ads, error, loading, total } = this.props
    const { currentPage } = this.state
    return (
      <div className="columns">
        <div className="column is-two-fifth">
          <SortBox currentPage={currentPage}/>
          <FilterBox currentPage={currentPage}/>
        </div>
        <div className="column is-three-fifths">
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
    total: state.advertisements.total,
    sort: { sort: state.view.sort, order: state.view.order },
    filter: { filter: state.view.filter, from: state.view.from, to: state.view.to }
  }
}

export default connect(mapStateToProps, { fetchAdverstisements })(AllAdvertisements)