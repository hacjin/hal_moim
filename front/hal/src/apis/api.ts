import axios from 'axios'

export default axios.create({
  baseURL: 'https://hacjin.tk:8080/api',
  // baseURL: 'https://localhost:8080/api',
  headers: {},
  // responseType: "json"
})

export const websocketUri = 'https://hacjin.tk:8080/api/webSocket'
