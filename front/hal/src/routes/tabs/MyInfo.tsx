import React, { useEffect, useState} from 'react';
import Profile from '../../components/Profile/Profile';
import api from '../../apis/api'
import MyInfoMoimList from '../../containers/MyInfoMoimList'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const MyInfo = () => {
  const [moimMe, setMoimMe] = useState([])
  const [moimOther, setMoimOther] = useState([])
  const [update, setUpdate] = useState(false)

  async function getMoimMeList(uid: Number) {
    await api
      .get('/moim/listByMe', {
        params: {
          uid: uid,
        },
      })
      .then((res: any) => setMoimMe(res.data.data))
  }
  async function getMoimOtherList(uid: Number) {
    await api
      .get('/moim/listByOther', {
        params: {
          uid: uid,
        },
      })
      .then((res: any) => setMoimOther(res.data.data))
  }

  useEffect(() => {
    if (update) {
      
    } else {
      //session id로 조회해야함
      let user = JSON.parse(sessionStorage.getItem('user') || '{}')
      console.log("user",user);
      getMoimMeList(user.uid)
      getMoimOtherList(user.uid)

      setUpdate(true)
    }
       
  })

  return (
    <div>
      <Profile />
      <Typography gutterBottom variant="subtitle1" style={{marginTop:'10px'}}>
      내가 개설한 모임
      </Typography>
      <MyInfoMoimList
      moims = {moimMe}
      />
      <Divider variant="middle" />
      <Typography gutterBottom variant="subtitle1" style={{marginTop:'10px'}}>
      내가 참여한 모임
      </Typography>
      <MyInfoMoimList
      moims = {moimOther}
      />
    </div>
  )
}

export default MyInfo
