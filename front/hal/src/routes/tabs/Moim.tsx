import React, { useEffect, useState } from 'react'
import api from '../../apis/api'
import CardList from '../CardList'

type MoimProps = {
  moim: Array<any>
  isMoims: (moims: Array<any>) => void
}
const Moim = ({ moim, isMoims }: MoimProps) => {
  const [update, setUpdate] = useState(false)
  async function getMoimList(dis_filter: Number, uid: Number) {
    await api
      .get('/moim/allList', {
        params: {
          uid: uid,
          dis_filter: dis_filter,
        },
      })
      .then((res: any) => isMoims(res.data.data))
  }
  useEffect(() => {
    if (update) {
    } else {
      getMoimList(10, 2)
      setUpdate(true)
    }
    // console.log(moim)
  }, [update])

  const getMoim = moim.map((data: any, index: number) => <CardList data={data} key={index} setUpdate={setUpdate} />)
  return (
    <>
      <div>{getMoim}</div>
    </>
  )
}

export default Moim
