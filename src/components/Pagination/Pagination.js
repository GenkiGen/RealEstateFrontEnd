import React from 'react'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.renderPages = this.renderPages.bind(this)
    this.onPage = this.onPage.bind(this)
    this.state = {
      current: 0
    }
  }

  onPage(page) {
    this.setState({
      current: page
    }, () => this.props.onPageClick(page))
  }

  renderPages() {
    const totalPages = Math.ceil(this.props.total / this.props.per_page)
    const { current } = this.state
    const pages = []
    for (let i = 0; i !== totalPages; ++i) {
      pages.push(<li key={i}>
        <p className={i === current ? "pagination-link is-current" : "pagination-link"} onClick={() => this.onPage(i)}>{i+1}</p>
      </li>)
    }
    return pages
  }

  render() {
    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
        {
          this.renderPages()
        }
        </ul>
      </nav>
    )
  }
}

export default Pagination