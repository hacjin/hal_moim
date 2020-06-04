import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, Theme } from '@material-ui/core'
import Color from 'color'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

interface Props {
  color: any
  image: string
  title: string
}
const useStyles = (color:string) => 
makeStyles({
  mediaStyles: {
    width: '100%',
    height: '0px',
    paddingBottom: '75%',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  actionArea: {
    height:'100%',
    borderRadius: '16',
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: {
    width: '108px',
    height: '100%',
    borderRadius: '8',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  },
  content: {
    backgroundColor: color,
    height: '56.8px',
    padding: '0px',
    textAlign:'center',
    verticalAlign:'middle',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '14px',
    color: '#fff',
    marginBlockStart:'0px', 
    marginBlockEnd:'0px', 
    paddingBottom:'0px',
    overflow:'hidden',
    textOverflow:'ellipsis',
    maxHeight:'52px',
    wordBreak:'break-all',
    display:'-webkit-box',
    WebkitLineClamp:3,
    WebkitBoxOrient:'vertical',
    paddingLeft:'3px',
    paddingRight:'3px',
  },
})

const MyInfoMoim = ({ color, image, title }: Props) => {
  const classes = useStyles(color)();

    return (
      <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardMedia className={classes.mediaStyles} image={image} />
          <CardContent className={classes.content} style={{paddingBottom:'0px'}}>
            <Typography className={classes.title} variant={'h2'}>
              {title}
            </Typography>
            {/* <Typography className={classes.subtitle} style={{marginTop:'2px'}}>{subtitle}</Typography> */}
          </CardContent>
        </Card>
      </CardActionArea>
    );
  };


  export default MyInfoMoim;