import React from 'react'
import { Link } from 'react-router-dom'

const Login_face = (props:any) => {

  console.log(props.location.state.user);

  return (
    <div>
        사진 로그인 프로세스 
        <div><Link to='/index'>로그인 성공시</Link></div>
    </div>
  )
}

export default Login_face
