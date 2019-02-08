import axios from 'axios'
import { constants } from '../constants'

export default axios.create({
  baseURL: 'http://localhost:3001'
})