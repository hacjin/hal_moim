import React, {useState} from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import api from '../apis/api'

interface Props extends RouteComponentProps {}

const Main = ( {history}:Props) => {

  const [phone, setPhone] = useState('');
  
  const handlePhone = (e:any) => {
    setPhone(e.target.value);
  }

  const login = async () => {
    if(phone == '' || phone == null) {
      alert("핸드폰 번호를 입력해주세요!!");
    } else {
      await api
      .get('/user/login', {
        params: {
          phone: phone
        }})
      .then( (res:any) => {  // res.data.data => User 정보
        if(res.data.data == null) {
          // 회원가입 페이지
          alert("등록된 정보가 없어요! 회원가입을 진행해 주세요!");
          history.push('/register');
        } else {
          // 로그인 페이지(얼굴인식)
          history.push({
            pathname: '/login_face',
            state: { user: res.data.data}
          });
        }
      })
    }
  }

  return (
    <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTk6-VN1r6MklkHzx-9tVNvggOegpRrtZ2cC_JR2cLYl2Kvt5S6&usqp=CAU"
        width="100%" height="100%"/>
        <div><h1>메인페이지</h1></div>

        <div>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handlePhone}/>
          <Button id="login" variant="contained" color="primary" onClick={login}>로그인</Button>
        </div>

    </div>
  )
}

export default Main
