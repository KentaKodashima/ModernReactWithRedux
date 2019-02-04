import React from 'react'

class SearchBar extends React.Component {
  state = { term: '' }

  onFormSubmit = (event) => {
    // Prevent the page from refreshing
    event.preventDefault()

    this.props.onSubmit(this.state.term)
  }

  // e: event = an JS object which contains a bunch of information about the event just occured
  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input 
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar