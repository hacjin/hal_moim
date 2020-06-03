import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

const FriendItem2 = (props : any) => {
// export default function FriendItem() {
  const classes = useStyles();
  const theme = useTheme();

  console.log(props.dataItem)
  const item = props.dataItem
  return (
    <Card className={classes.root}>
        <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
        />  
      <div className={classes.details}>
        <CardContent className={classes.content}>
        <div className='col-2'>
          <Typography component="h5" variant="h5">
            {item.name}
          </Typography>
          </div>
          <div className='col-2'>
          <Typography variant="subtitle1" color="textSecondary">
          (60대 여)
          </Typography>
          </div>
        </CardContent>
        <div className={classes.controls}>
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton> */}
          <IconButton aria-label="play/pause">
              채팅하기
            {/* <PlayArrowIcon className={classes.playIcon} /> */}
          </IconButton>
          {/* <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
        </div>
      </div>

    </Card>
  );
}

export default FriendItem2