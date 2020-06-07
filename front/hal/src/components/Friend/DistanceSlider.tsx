import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding : '0px 30px',
  },
  slider:{
    color: '#336714'
  }
});

const marks = [
  {
    value: 1,
    label: '1km',
  },
  {
    value: 3,
    label: '3km',
  },
  {
    value: 5,
    label: '5km',
  },
];


export default function DistanceSlider(props:any) {
  const classes = useStyles();
  console.log("props",props)

  function changeDistance(event:any, value: number |number[]) {
    console.log(value)
    props.distance(value)
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" >
        친구와의 거리
      </Typography>
      <Slider
        min = {1}
        max = {5}
        defaultValue={3}
        aria-labelledby="discrete-slider-restrict"
        step={2}
        marks={marks}
        onChange = {changeDistance}
        className = {classes.slider}
      />
    </div>
  );
}