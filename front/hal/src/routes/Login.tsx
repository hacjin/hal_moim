import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        핸드폰 번호 : 입력
        <div><Link to='./login_face'>얼굴인식 하자</Link></div>
    </div>
  )
}

export default Login
