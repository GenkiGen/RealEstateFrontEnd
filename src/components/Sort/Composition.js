import React from 'react'
import { connect } from 'react-redux'
import { modifySort, modifySortOrder } from '../../redux/actions/view'
import { fetchAdverstisements } from '../../redux/actions'
import OrderSelect from './Order';
import Sort from './Field';

const SortBox = ({ sort, currentPage, order, modifySort, modifySortOrder, fetchAdverstisements, filter, from, to }) => {
  function onOrderChosen(order) {
    modifySortOrder({ order })
  }

  function onFieldChosen(sort) {
    modifySort({ sort })
  }

  function apply() {
    const filterObject = (filter) ? {
      filter,
      from,
      to
    } : null
    fetchAdverstisements(currentPage, {
      sort, order
    }, filterObject)
  }

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Sort</p>
      </div>
      <div className="card-content">
        <OrderSelect onOrderSelect={onOrderChosen} order={order}/>
        <Sort onFieldChosen={onFieldChosen} sectionName="sort" chosen={sort}/>
        <button className="button is-primary is-rounded"
                style={{width: "100%"}}
                onClick={apply}>Apply</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filter: state.view.filter,
    from: state.view.from,
    to: state.view.to,
    sort: state.view.sort,
    order: state.view.order
  }
}

export default connect(mapStateToProps, { modifySort, modifySortOrder, fetchAdverstisements })(SortBox)