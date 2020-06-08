import React, { useEffect, useState } from 'react'
import api from '../../apis/api'
import CardList from '../CardList'
import AddIcon from '@material-ui/icons/Add'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import MakeMoim from '../../components/MakeMoim'
import DistanceSlider from '../../components/Friend/DistanceSlider'

type MoimProps = {
  moim: Array<any>
  isMoims: (moims: Array<any>) => void
}
const useStyles = makeStyles((theme: Theme) => ({
  fab: { position: 'absolute', right: theme.spacing(2) },
}))

const Moim = ({ moim, isMoims }: MoimProps) => {
  const [scrollPosition, setScrollPosition] = useState(90)
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const [distance, setDistance] = useState(3)
  const classes = useStyles(scrollPosition)
  let user = JSON.parse(window.sessionStorage.getItem('user') || '{}')

  const handleScroll = () => {
    const clientHeight = document.documentElement.clientHeight
    const position = window.pageYOffset
    const result = (position / clientHeight) * 100
    const scrollHeight = document.documentElement.scrollHeight

    setScrollPosition(90 + result)
    const fabBtn = document.getElementsByTagName('button').item(2) || null
    if (scrollHeight - clientHeight === Math.round(position)) {
      if (fabBtn !== null) fabBtn.style.display = 'none'
    } else {
      if (fabBtn !== null) fabBtn.style.display = 'inline-flex'
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  async function getMoimList(dis_filter: Number, uid: Number) {
    console.log('거리', dis_filter)
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
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    } else {
      getMoimList(distance, user.uid)
      setUpdate(true)
    }
  })
  const getMoim = moim.map((data: any, index: number) => <CardList data={data} key={index} setUpdate={setUpdate} />)
  return (
    <div>
      <DistanceSlider distance={setDistance} text={'주변 모임 거리'} setUpdate={setUpdate} />
      <div>{getMoim}</div>
      <Fab
        //
        aria-label="Add"
        className={classes.fab}
        color="default"
        style={{ top: `${scrollPosition}%` }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <MakeMoim open={open} setOpen={setOpen} />
    </div>
  )
}

export default Moim
