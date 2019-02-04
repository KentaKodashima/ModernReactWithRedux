import { combineReducers } from 'redux'

// Reducer for song list
const songsReducer = () => {
  return [
    { title: 'No Scrubs', duration: '4:05' },
    { title: 'Macarena', duration: '2:30' },
    { title: 'All Star', duration: '3:15' },
    { title: 'I Want It That Way', duration: '1:45' }
  ]
}

// Reducer for selected song
const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload
  }

  return selectedSong
}

// Keys will be the state's keys
export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer
})