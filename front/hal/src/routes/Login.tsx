import React from 'react'
import { Link } from 'react-router-dom'

const Login = (props:any) => {
  return (
    <div>
        핸드폰 번호(props) : {props.location.state.phone}
        <div><Link to='./login_face'>얼굴인식 하자</Link></div>
    </div>
  )
}

export default Login
