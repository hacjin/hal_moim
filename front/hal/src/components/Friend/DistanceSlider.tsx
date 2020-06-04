import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding : '0px 30px'
  },
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



// function valueLabelFormat( value: number) {
//   console.log("la",value)
//   return marks.findIndex((mark) => mark.value === value) + 1;
// }

export default function DistanceSlider(props:any) {
  const classes = useStyles();
  console.log("props",props)

  function changeDistance(event:any, value: number |number[]) {
    console.log(value)
    props.distance(value)
    // return `${value}°C`;
  }

  return (
    <div className={classes.root}>
      {/* <Typography id="discrete-slider-restrict" gutterBottom>
        Restricted values
      </Typography> */}
      <Slider
        min = {1}
        max = {5}
        defaultValue={3}
        // valueLabelFormat={valueLabelFormat}
        // getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        // step={null}
        // valueLabelDisplay="auto"
        marks={marks}
        onChange = {changeDistance}
      />
    </div>
  );
}