import React from 'react'

export default class Range extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      from: undefined,
      to: undefined
    }
  }

  onChange(e) {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState, () => this.props.onRangeChange(this.state))
  }

  render() {
    const { from, to } = this.props
    return (
      <div>
        <input type="number" className="input is-primary is-rounded"
              placeholder="From" name="from" onChange={this.onChange}
              defaultValue={from !== 0 ? from : null}/>
        <input type="number" className="input is-primary is-rounded"
              placeholder="To" name="to" onChange={this.onChange}
              defaultValue={to !== 0 ? to : null}/>
      </div>
    )
  }
}