import React, { useEffect, useState} from 'react'
import api from '../../apis/api'
import MyInfoMoimList from '../../containers/MyInfoMoimList'


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
      getMoimMeList(1)
      getMoimOtherList(1)

      setUpdate(true)
    }
       
  })

  return (
    <div>이 페이지는 내 정보페이지입니다.
      <h2>내가 개설한 모임</h2>
      <MyInfoMoimList
      moims = {moimMe}
      />
      <h2>내가 참여한 모임</h2>
      <MyInfoMoimList
      moims = {moimOther}
      />
    </div>
  )
}

export default MyInfo
