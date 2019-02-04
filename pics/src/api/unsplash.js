import axios from 'axios'
import constants from '../constants'

export default axios.create({
  baseURL: constants.ROOT_URL,
  headers: {
    Authorization: `Client-ID ${constants.ACCESS_KEY}`
  }
})