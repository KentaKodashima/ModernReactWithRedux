import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder'

// Defining a function that is returning a function
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts')

  dispatch({ type: 'FETCH_POSTS', payload: response.data })
}


export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`)

  dispatch({ type: 'FETCH_USER', payload: response.data })
}

// Pass getState() to access to Redux states
export const fetchPostAndUsers = () => async (dispatch, getState) => {
  // Need to pass it in dispatch() in order to use another action creator in an action creator
  await dispatch(fetchPosts())

  // Iterate through using lodash map()
  // _.uniq() only returns unique values

  // Version 1
  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // userIds.forEach(id => dispatch(fetchUser(id)))

  // Version 2
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value()
}

// Memoized version - it gets called only one time with each ids
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch)
// // '_' in the name _fetchUser implies that this is a private function
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`)

//   dispatch({ type: 'FETCH_USER', payload: response.data })
// })