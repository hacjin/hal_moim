import React, {useState} from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { TextField, Button, CssBaseline, Typography, Container, Box } from '@material-ui/core';
import api from '../apis/api'
import { makeStyles } from '@material-ui/core/styles';

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
          //sessionStorage.setItem('user', JSON.stringify(res.data.data));
          history.push({
<<<<<<< HEAD
            // pathname: '/login_face',
            pathname: '/moim',
=======
            pathname: '/login_face',
            //pathname: '/moim',
>>>>>>> 5194fd17ab3be29c3a5203ce8c03305d1189364d
            state: { user: res.data.data }
          });
        }
      })
    }
  } // login

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {'SSAFY 107팀'} 
        <h6>{'김혜희 / 박성호 / 이학진 / 최현정 / 홍기석'}</h6>
        {/* {new Date().getFullYear()} */}
        {'.'}
      </Typography>
    );
  } // copyright

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper} 
      // style={{backgroundImage: `url(${require("./bgtest.gif")})`}}
    >
      <Typography component="h1" variant="h5">
        할 모 임
      </Typography>
      <TextField
        color = 'secondary'
        variant="outlined" margin="normal" required fullWidth
        id="phone" label="핸드폰 번호" name="phone" autoComplete="phone"
        value={phone}
        onKeyUp={(event) => {
          if (event.key== 'Enter') {
            login(event);
          }  
        }}
        onChange={handlePhone} autoFocus/>
      <Button
        id="login" type="submit" fullWidth variant="contained"
        color="primary" className={classes.submit}
        onClick={login}
      > 로그인 </Button>
    <Box mt={8}>
      <Copyright/>
    </Box>
    </div>
    </Container>
  )
}

export default Main
