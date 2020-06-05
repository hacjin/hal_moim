import React, { useEffect, useState} from 'react';
import MyInfoMember from './MyInfoMember'
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Color from 'color'
import Grid from '@material-ui/core/Grid';
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PlaceIcon from '@material-ui/icons/Place';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import StarIcon from '@material-ui/icons/Star';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import api from '../apis/api'

interface Props {
  data: any
}
const useStyles = (color:string) => 
makeStyles({
  appBar: {
    position: 'relative',
  },
  popupTitle:{
    flex: '1',
    marginLeft: '16px',
  },
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
})

const MyInfoMoim = ({ data }: Props) => {
  const color = data.state===true?'#6a60a9':'#dedcee'
  const classes = useStyles(color)();
  const [open, setOpen] = React.useState(false);
  const [openMember, setOpenMember] = React.useState(false);
  const time = data.time.split(/[. : T -]/)
  const timetext = time[0]+'년 '+time[1]+'월 '+time[2]+'일 '+time[3]+'시:+'+time[4]+'분까지'
  const hosttext = data.host.name+' ('+data.host.birth+' / '+(data.host.gender === 1 ? '남성' : '여성')+')'
  const [member, setMember] = useState([])
  const [update, setUpdate] = useState(false)

  async function getMember(mid: Number) {
    await api
      .get('/moim/participateAllList', {
        params: {
          mid: mid,
        },
      })
      .then((res: any) => setMember(res.data.data))
  }

  useEffect(() => {
    if (update) {
    } else {
      getMember(data.mid)
      setUpdate(true)
    }
       
  })

  const myInfoMemberList = member.map((dataM:any, index: number) => <MyInfoMember
                                                              data={dataM}
                                                              key={index} />)

  const handleClick = () => {
    setOpenMember(!openMember);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      <Grid item>
        <CardActionArea className={classes.actionArea} onClick={handleClickOpen}>
          <Card className={classes.card}>
            <CardMedia className={classes.mediaStyles} image={data.moimImg} />
            <CardContent className={classes.content} style={{paddingBottom:'0px'}}>
              <Typography className={classes.title} variant={'h2'}>
                {data.title}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.popupTitle}>
              {data.title}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              모임취소
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PlaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="장소" secondary={data.location} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WatchLaterIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="시간" secondary={timetext}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="설명" secondary={data.coment} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={hosttext} secondary={data.host.phone} />
      </ListItem>

      <ListItem button onClick={handleClick}>
        <ListItemAvatar>
          <Avatar>
            <GroupIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="참여자" />
        {openMember ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMember} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {myInfoMemberList}
        </List>
      </Collapse>
    </List>
      </Dialog>
      </Grid>
    );
  };


  export default MyInfoMoim;