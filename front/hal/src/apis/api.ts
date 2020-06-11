import axios from 'axios'

export default axios.create({
  baseURL: 'https://52.78.120.154:8080/api',
  // baseURL: 'http://localhost:8080',
  headers: {},
  // responseType: "json"
})

export const websocketUri = 'https://52.78.120.154:8080/api/webSocket'
