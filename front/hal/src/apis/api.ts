import axios from 'axios'

export default axios.create({
  baseURL: 'http://52.78.120.154:8080',
  // baseURL: 'http://localhost:8080',
  headers: {},
  // responseType: "json"
})
