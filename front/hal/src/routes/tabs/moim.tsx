import React, { useEffect, useState } from 'react'
import api from '../apis/api'
import CardList from './CardList'

type MoimProps = {
  moim: Array<any>
  isMoims: (moims: Array<any>) => void
}
const Moim = ({ moim, isMoims }: MoimProps) => {
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
    getMoimList(10, 2)
  }, [])

  const getMoim = moim.map((data: any, index: number) => <CardList data={data} key={index} />)
  return (
    <>
      <div>{getMoim}</div>
    </>
  )
}

export default Moim
