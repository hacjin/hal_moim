import React, { useState, FormEvent } from 'react'
import { makeStyles, Theme, Dialog, DialogTitle, DialogContent, TextField, Button, Input } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import convert from 'date-fns/locale/ko'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import { RouteComponentProps } from 'react-router-dom'
import api from '../apis/api'
import Moment from 'moment'

declare const daum: any
declare const kakao: any
const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    textAlign: 'center',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > div': {
      width: '80%',
    },
  },
  input: {
    display: 'none',
  },
  preview: {
    margin: '0px auto',
    backgroundColor: '#efefef',
    width: '300px',
    height: '200px',
  },
}))

interface Props extends RouteComponentProps {}

function MakeMoim(props: any, { history }: Props) {
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [title, setTitle] = useState('')
  const [coment, setComent] = useState('')
  const [imgBase64, setImgBase64] = useState('')
  const [file, setFile] = React.useState<FileList | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
    //
  )
  const classes = useStyles()
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleComent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComent(event.target.value)
  }
  const handleClose = () => {
    setTitle('')
    setComent('')
    setFile(null)
    setImgBase64('')
    setLocation('')
    props.setOpen(false)
  }
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result
      if (base64) {
        setImgBase64(base64.toString())
      }
    }
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0])
      setFile(e.target.files)
    }
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    let user = JSON.parse(window.sessionStorage.getItem('user') || '{}')
    const data = new FormData()
    data.append('mid', JSON.stringify(0))
    data.append('title', title)
    data.append('time', Moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
    data.append('location', location)
    data.append('state', JSON.stringify(true))
    data.append('latitude', latitude.toString())
    data.append('longitude', longitude.toString())
    data.append('coment', coment)
    if (file) {
      data.append('file', file[0])
    }
    data.append('uid', JSON.stringify(1))
    // 만들기 전송
    await api.post('/moim/add', data).then((res) => {
      console.log(res)
    })
  }
  const post = async () => {
    await new daum.Postcode({
      oncomplete: function (data: any) {
        setLocation(data.address)
        const geocoder = new kakao.maps.services.Geocoder()
        geocoder.addressSearch(data.address, function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            setLatitude(result[0].y)
            setLongitude(result[0].x)
          }
        })
      },
    }).open()
  }

  return (
    <div>
      <Dialog
        //
        className={classes.dialog}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">모임 만들기</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <div className={classes.preview}>{imgBase64 === '' ? '' : <img className={classes.preview} src={imgBase64} alt="미리보기" />}</div>
            <input
              //
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImg}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                이미지 업로드
              </Button>
            </label>
            <br />
            <TextField id="outlined-basic" label="제목" variant="outlined" value={title} onChange={handleTitle} />
            <br />
            <MuiPickersUtilsProvider locale={convert} utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="모임 날짜"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <br />
              <KeyboardTimePicker
                margin="normal"
                format="HH:mm:ss"
                id="time-picker"
                label="모임 시간"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
            <br />
            <TextField
              variant="outlined"
              label="만날 장소를 검색해주세요."
              InputProps={{
                readOnly: true,
              }}
              value={location}
              onClick={post}
            ></TextField>
            <br />
            <TextField
              //
              id="outlined-multiline-static"
              label="모임 설명"
              multiline
              value={coment}
              onChange={handleComent}
              variant="outlined"
            />

            <div>
              <Button color="primary" variant="contained" onClick={handleSubmit}>
                만들기
              </Button>
              &emsp;
              <Button color="primary" variant="contained" onClick={handleClose}>
                취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MakeMoim
