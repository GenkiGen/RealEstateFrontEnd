import React from 'react'
import { connect } from 'react-redux'
import { modifyFilter, modifyFilterRange } from '../../redux/actions/view'
import { fetchAdverstisements } from '../../redux/actions'
import Field from '../Sort/Field'
import Range from './Range'

class FilterBox extends React.Component {
  constructor(props) {
    super(props)
    this.onFieldChosen = this.onFieldChosen.bind(this)
    this.onRangeChange = this.onRangeChange.bind(this)
    this.onApply = this.onApply.bind(this)
  }

  onFieldChosen(field) {
    this.props.modifyFilter({ field })
  }

  onRangeChange(range) {
    this.props.modifyFilterRange(range)
  }

  onApply() {
    const { filter, from, to, currentPage, sort, order } = this.props
    if (!filter) {
      alert('Please enter a filtering credentials')
    } else if (from === 0 && to === 0) {
      alert('Please enter a from and to value')
    } else if (from > to) {
      alert('From value can not be less than to value')
    } else {
      this.props.fetchAdverstisements(currentPage, {
        sort, order
      }, {
        filter,
        from, 
        to
      })
    }
  }

  render() {
    const { filter, from, to } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <h1 className="card-header-title">Filter</h1>
        </div>
        <div className="card-content">
          <Field onFieldChosen={this.onFieldChosen} sectionName="filter" chosen={filter}/>
          <Range onRangeChange={this.onRangeChange} from={from} to={to}/>
          <button className="button is-info is-rounded"
                  onClick={() => this.onApply()}
                  style={{width: "100%"}}>Apply</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filter: state.view.filter,
  from: state.view.from,
  to: state.view.to,
  sort: state.view.sort,
  order: state.view.order
})

export default connect(mapStateToProps, { modifyFilter, modifyFilterRange, fetchAdverstisements })(FilterBox)