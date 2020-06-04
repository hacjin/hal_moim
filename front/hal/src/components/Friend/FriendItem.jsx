import React,{useState} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import API from "../../apis/api"

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    // borderRadius: spacing(2), // 16px
    transition: '0.3s',
    // boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    // maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#fffcf0',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('xs')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

const FriendItem = (props) => {

  const item = props.dataItem
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  const [isOpen, setIsOpen] = useState(false);


  async function _onFormSubmit(){

    console.log("onform", item)
    //이친구와 방이 있나 확인(있으면 방 번호 리턴, 없으면 방 만들고 방번호 리턴)
    const roomId = await API.get('chat/addRoom',{
        params:{
            senderId: 1, //세션
            receiverId: item.uid
        }
    })

    //채팅방 메시지 불러오기
    let totalChatData = await API.get('chat/findChatListById', {
        params: {
          rid : roomId.data.data
        }
    })
    var roomMessageList = []
    
    totalChatData.data.data.forEach(function(item, index, array){
        var replytext 
        if(item.type ==='text'){
          replytext = {'text':item.message}
        }else{
          replytext = {'emoji':item.message}
        }
        roomMessageList.push({
            author: item.sender.uid==1?'me':'them',
            type: item.type,
            data: replytext
            })
    })

    
    setIsOpen(true);
    props.openChatWindow(true,roomId.data.data,item,roomMessageList);
}

 console.log(contentStyles)
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={
          item.profileImg
          // "../../public/logo.jpg"
        }
      />
      <CardContent style={{width:'400px'}}>
        <TextInfoContent
          // classes={contentStyles}
          // overline={'28 MAR 2019'}
          heading={item.name}
          body={
            item.description
            // 'Git is a distributed version control system. Every dev has a working copy of the code and...'
          }
        />
        <Button  variant="contained" color="primary" fullWidth="true" onClick={_onFormSubmit}>메세지 보내기</Button>
        {/*  classes={{color:'blue'}} */}
      </CardContent>
    </Card>
  );
};

export default FriendItem;