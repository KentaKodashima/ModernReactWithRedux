import _ from 'lodash'
import { 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types'

export default (state={}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // mapKeys() from lodash takes an array and convert it to an object
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_STREAM:
      // Create state without payload using omit() from lodash
      return _.omit(state, action.payload)
    default:
      return state
  }
}