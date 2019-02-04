import React from 'react'
import unsplash from '../api/unsplash'
import constants from '../constants'
import SearchBar from './SearchBar'
import ImageList from './ImageList'

class App extends React.Component {
  state = { images: [] }

  // term is passed from its child via callback
  // in order to avoid 'this' problem, make the function arrow function
  onSearchSubmit = async (term) => {
    const response = await unsplash
      .get((constants.END_POINT), {
        params: { query: term }
      })
    
    this.setState({ images: response.data.results })
  }

  render () {
    return (
      <div className="ui container" style={{ marginTop: '10px'}}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
      </div>
    )
  }
}

export default App