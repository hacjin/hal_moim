import React, {useState, useEffect} from 'react'
import { Button, TextField, FormControl, RadioGroup, 
  FormControlLabel, Radio, Grid, Container, Typography, 
  CssBaseline, Avatar } from '@material-ui/core';
import api from '../../apis/api'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { RouteComponentProps } from 'react-router-dom';

declare var kakao:any

interface Props extends RouteComponentProps {}

const Register = ( {history}:Props ) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [addr, setAddr] = useState('');
  const [myImg, setMyImg] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  useEffect(() => {
    console.log(history.location.state);
  }, []);

  // ********
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
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }));
  const classes = useStyles();
  // ********

  // *********************  현재 내 위치 찾기 시작 *********************
  const options = {
    enableHighAccuracy: true, 
    maximumAge: 30000, 
    timeout: 5000
  };

  function success(position: any) {
    const latitude  = position.coords.latitude;  // 위도
    const longitude = position.coords.longitude; // 경도
    
    const loc = new kakao.maps.services.Geocoder();
    loc.coord2Address(longitude, latitude, (result:any, status:any) => {
      if (status === kakao.maps.services.Status.OK) {
        alert(result[0].address.address_name);
        setAddr(result[0].address.address_name);
        setLatitude(latitude);
        setlongitude(longitude);
      }
    });

  }
  function error(err: any) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  const handleLocation = (e:any) => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      console.warn("현재 위치를 표시 할 수 없습니다.")
    }
  }
  // *********************  현재 내 위치 찾기 끝 *********************

  const handlePhone = (e:any) => {
    // 숫자 형식 변형
    const onlyNums = e.target.value.replace(/[^0-9]+/g, '');
    if(onlyNums.length <= 11) {
      setPhone(e.target.value);
    }
  }
  const handleName = (e:any) => {
    setName(e.target.value);
  }
  const handleBirth = (e:any) => {
    setBirth(e.target.value);
  }
  const handleGender = (e:any) => {
    setGender(e.target.value);
  }
  const handleMyImg = (e:any) => {
    setMyImg(e.target.files[0]);
  }
  const handleSubmit = (e:React.MouseEvent<any>) => {
    e.preventDefault();
    
    // formdata 셋팅
    let formdata = new FormData();
    formdata.append('name',name);
    formdata.append('phone', phone);
    formdata.append('birth',birth);
    formdata.append('gender',gender);
    formdata.append('addr',addr);
    formdata.append('latitude',latitude);
    formdata.append('longitude',longitude);
    formdata.append('myImg',myImg);

    doRegist(formdata);
  }

  const doRegist = async (formdata:FormData) => {
    // console.log("name!!",formdata.get('name'));
    // console.log("phone!!",formdata.get('phone'));
    // console.log("birth!!", formdata.get('birth'));
    // console.log("gender!!",formdata.get('gender'));
    // console.log("addr!!",formdata.get('addr'));
    // console.log("lat!!", formdata.get('latitude'));
    // console.log("lng!!", formdata.get('longitude'));
    // console.log("myImg!!",formdata.get('myImg'));

    await api
    .post('/user/add-user', formdata)
    .then( (res:any) => {
      // 세션스토리지 저장
      sessionStorage.setItem('user', res.data.data);
      history.push('/moim');
    })

  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>
          Hal
        </Avatar>
        <Typography component="h1" variant="h4">
          회원 가입
        </Typography>
        
        <hr style={{
          color: '#000000',
          backgroundColor: '#000000',
          height: .9,
          borderColor : '#000000'
        }}/>

        <Grid container spacing={2}>
          {/* 성 함 */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="name" variant="outlined" required fullWidth
              id="name" label="성 함" autoFocus onChange={handleName} />
          </Grid>

          {/* 생일년도 */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined" required fullWidth
              id="birth" type="number" label="생일년도" name="birth"
              onInput = {(e:any) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
              }}
              onChange={handleBirth} />
          </Grid>

          {/* 핸드폰 번호 */}
          <Grid item xs={12}>
            <TextField
              variant="outlined" required fullWidth
              id="phone" label="핸드폰 번호" name="phone" onChange={handlePhone} />
          </Grid>

          {/* 성 별 */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender" onChange={handleGender} row> 
                <FormControlLabel value="1" control={<Radio />} label="남자" />
                <FormControlLabel value="2" control={<Radio />} label="여자" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* 내 위치 확인 */}
          <Grid item xs={12} sm={4}>
            <Button id="addr" variant="contained" color="secondary" 
              fullWidth size="large"
              onClick={handleLocation}>위치확인</Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined" required fullWidth disabled
              id="location" label="지역" name="location" value={addr} />
          </Grid>

          {/* 얼굴사진 등록 */}
          <Grid item xs={12}>
            <Button id="addr" variant="contained" color="secondary" fullWidth size="large">
              <input id={"file-input"}  type="file" name="imageFile" multiple
              onChange={handleMyImg} />
              얼굴 등록
            </Button>
          </Grid>
        </Grid>
        

        {/* Register Submit */}
        <Button
          type="submit"  fullWidth variant="contained" color="primary" 
          className={classes.submit} onClick={handleSubmit} >
          가입하깅
        </Button>        
      </div>
    </Container>
  )
}

export default Register
