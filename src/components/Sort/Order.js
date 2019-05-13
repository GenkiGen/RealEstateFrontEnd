import React from 'react'

const OrderSelect = ({ onOrderSelect= f=>f, order }) => {
  function onSelect(e) {
    onOrderSelect(e.target.value)
  }
  return (
    <div className="select">
      <select onChange={onSelect} defaultValue={order}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}

export default OrderSelect