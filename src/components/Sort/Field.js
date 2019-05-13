import React from 'react'

const Field = ({ onFieldChosen, sectionName, chosen }) => {
  return (
    <div onChange={(e) => onFieldChosen(e.target.value)}>
      <input type="radio" value="price" name={sectionName} defaultChecked={chosen === 'price'}/>Price<br />
      <input type="radio" value="size" name={sectionName} defaultChecked={chosen === 'size'}/>Size<br />
      <input type="radio" value="totalBedrooms" name={sectionName} defaultChecked={chosen === 'totalBedrooms'}/>Number of bedrooms<br />
      <input type="radio" value="totalFloors" name={sectionName} defaultChecked={chosen === 'totalFloors'}/>Number of floors<br />
      <input type="radio" value="title" name={sectionName} defaultChecked={chosen === 'title'}/>Name<br />
    </div>
  )
}

export default Field