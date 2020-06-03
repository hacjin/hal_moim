import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const marks = [
  {
    value: 10,
    label: '1km',
  },
  {
    value: 20,
    label: '2km',
  },
  {
    value: 30,
    label: '3km',
  },
  {
    value: 50,
    label: '5km',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function DistanceSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Typography id="discrete-slider-restrict" gutterBottom>
        Restricted values
      </Typography> */}
      <Slider
        defaultValue={20}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        // valueLabelDisplay="auto"
        marks={marks}
      />
    </div>
  );
}