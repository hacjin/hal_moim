import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTk6-VN1r6MklkHzx-9tVNvggOegpRrtZ2cC_JR2cLYl2Kvt5S6&usqp=CAU"/>
        <div><h1>메인페이지 꾸미자</h1></div>
        <div><Link to='./register'>회원가입</Link></div>
        <div><Link to='./login'>로그인</Link></div>
    </div>
  )
}

export default Main
