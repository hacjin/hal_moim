import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core';


const Main = () => {

  const [phone, setPhone] = useState('');
  
  return (
    <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTk6-VN1r6MklkHzx-9tVNvggOegpRrtZ2cC_JR2cLYl2Kvt5S6&usqp=CAU"/>
        <div><h1>메인페이지</h1></div>
        <div><Link to='/register'>회원가입</Link></div>
        <div><Link to = {{
          pathname: '/login',
          state: {
            phone: phone
          }
        }}>로그인</Link></div>

        <div>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </div>

    </div>
  )
}

export default Main
