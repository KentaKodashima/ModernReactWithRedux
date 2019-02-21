import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSong } from '../actions'

class SongList extends Component {
  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button 
              className="ui button primary"
              onClick={() => this.props.selectSong(song)}
            >
              Select
            </button>
          </div>
          <div className="content">
            {song.title}
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="ui divided list">
        {this.renderList()}
      </div>
    )
  }
}

// Anytime we change redux state, this function gets called
// Takes all states from the Redux store
// Computates them to show as props inside of the React Component
const mapStateToProps = state => {
  return { songs: state.songs }
}

// Connect redux states and action to SongList
export default connect(mapStateToProps, { selectSong })(SongList)