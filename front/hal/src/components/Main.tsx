import React, {useState} from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { TextField, Button, CssBaseline, Typography, Container, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import api from '../apis/api'
import { makeStyles } from '@material-ui/core/styles';

import Mains from './Mains';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    marginTop: theme.spacing(5),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fffcf2',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
  },
}));

interface Props extends RouteComponentProps {}

const Main = ( {history}:Props ) => {
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자 형식 변형
    const onlyNums = e.target.value.replace(/[^0-9]+/g, '');
    if(onlyNums.length < 11) {
      setPhone(onlyNums);
    }
    else if (onlyNums.length === 11) {
      const number = onlyNums.replace(
        /(\d{3})(\d{4})(\d{4})/,
        '$1-$2-$3'
      );
      setPhone(number);
    }
  }

  const login = async (e: any) => {
    e.preventDefault(); // React.MouseEvent<any> | React.KeyboardEvent<HTMLDivElement>

    if(phone === '' || phone === null) {
      alert("핸드폰 번호를 입력해주세요!!");
    } else if(phone.length !== 13 || phone.substr(0,3) !== '010') {
      alert("정확한 핸드폰 번호를 입력해주세요..");
      setPhone('');
    } else {
      const num = phone.replace(/-/gi,'');
      await api
      .get('/user/login', {
        params: {
          phone: num
        }
      })
      .then( (res:any) => {  // res.data.data => User 정보
        if(res.data.data == null) {
          // 회원가입 페이지
          alert("등록된 정보가 없어요! 회원가입을 진행해 주세요!");
          history.push({
            pathname: '/register',
            state: { phone: num }
          })
        } else {
          // 로그인 페이지(얼굴인식)
          // sessionStorage.setItem('user', JSON.stringify(res.data.data));
          history.push({
            pathname: '/login_face',
            // pathname: '/moim',
            state: { user: res.data.data }
          });
        }
      })
    }
  } // login

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © SSAFY 107팀'}
        <br/>
        {'김혜희 / 박성호 / 이학진 / 최현정 / 홍기석'}
        {/* {new Date().getFullYear()} */}
        {'.'}
      </Typography>
    );
  } // copyright

  return (
    <Mains {...history}/>
    // <Container component="main" maxWidth="xs">
    // <CssBaseline />
    //   <Container component="main" maxWidth="sm">
    //   <div className={classes.paper} 
    //     // style={{backgroundImage: `url(${require("./bgtest.gif")})`}}
    //   >
    //     <Typography component="h1" variant="h5">
    //       할 모 임
    //     </Typography>
    //     <TextField
    //       color = 'secondary'
    //       variant="outlined" margin="normal" required fullWidth
    //       id="phone" label="핸드폰 번호" name="phone" autoComplete="phone"
    //       value={phone}
    //       onKeyUp={(event) => {
    //         if (event.key=== 'Enter') {
    //           login(event);
    //         }  
    //       }}
    //       onChange={handlePhone} autoFocus/>
    //     <Button
    //       id="login" type="submit" fullWidth variant="contained"
    //       color="primary" className={classes.submit}
    //       onClick={login}
    //     > 로그인 </Button>
      
    //   </div>
    //   </Container>

    //   {/* Intro 1 */}
    //   <Container component="main" maxWidth="sm">
    //     <Card className={classes.root}>
    //     <div className={classes.details}>
    //       <CardContent className={classes.content}>
    //         <Typography component="h6" variant="h6">
    //           노후를 즐겁게!
    //         </Typography>
    //         <Typography variant="subtitle2" color="textSecondary">
    //           지금은 동네 친구가 필요한 순간!
    //           같은 관심사를 가진 사람들과 소통해 보세요!
    //         </Typography>
    //       </CardContent>
          
    //     </div>
    //     <CardMedia
    //       className={classes.cover}
    //       image="http://blogfiles.naver.net/MjAxOTA3MDFfMjYy/MDAxNTYxOTM4NDY3ODc5.NXRWU-AICzwyxrGGwzXm17SqSm4cUUx13NyadxLub6Mg.5hA0uWxA95Ti2KvoQB1SN3UkXIrftWSgLuJMaf-PVREg.PNG.hanwha_official/%BE%D7%C6%BC%BA%EA%BD%C3%B4%CF%BE%EE-02.png"
    //       title="intor_1"
    //     />
    //   </Card>
    //   </Container>
      
    //   {/* Intro 2 */}
    //   <Container component="main" maxWidth="sm">
    //     <Card className={classes.root}>
    //     <CardMedia
    //       className={classes.cover}
    //       image="http://imgnews.naver.net/image/5727/2019/03/11/0000000043_001_20190311155701622.jpg"
    //       title="intor_2"
    //     />
    //     <div className={classes.details}>
    //       <CardContent className={classes.content}>
    //         <Typography component="h6" variant="h6">
    //           쉽고 간편하게!
    //         </Typography>
    //         <Typography variant="subtitle2" color="textSecondary">
    //           얼굴인식으로 편하게 로그인하세요! 주위 사람들과 편하게 대화해 보세요!
    //         </Typography>
    //       </CardContent>
          
    //     </div>
    //   </Card>
    //   </Container>

    //   {/* CopyRight */}
    //   <Box mt={8}>
    //     <Copyright/>
    //   </Box>
    // </Container>
  )
}

export default Main
