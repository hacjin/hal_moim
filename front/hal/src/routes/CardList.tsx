import React from 'react'
import { Button, Card, CardHeader, CardContent, CardActions, TextField, Typography } from '@material-ui/core'
type CardProps = {
  data: any
}
const CardList = ({ data }: CardProps) => {
  const time = data.time.split(/[. : T -]/)
  return (
    <>
      <Card elevation={1}>
        <CardHeader title={data.title} />
        <CardContent>
          <Typography variant="body1" component="p">
            <span> 장소 : {data.location}</span>
            <br />
          </Typography>
          <Typography variant="body1" component="p">
            <span>
              시간 : {time[0]}년 {time[1]}월 {time[2]}일 {time[3]}시:{time[4]}분까지
            </span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            참가
          </Button>
          <Typography style={{ display: 'inline-flex', flex: '9' }}>{data.count}명</Typography>
        </CardActions>
      </Card>
      <br />
    </>
  )
}

export default CardList
