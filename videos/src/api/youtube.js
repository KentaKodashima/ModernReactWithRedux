import axios from 'axios'
import constants from '../constants'

export default axios.create({
  baseURL: constants.ROOT_URL,
  params: {
    part: 'snippet',
    maxResults: 5,
    key: constants.API_ACCESS_KEY
  }
})