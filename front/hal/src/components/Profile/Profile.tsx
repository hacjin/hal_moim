import React, {useState, useEffect} from 'react'
import { Button, TextField, Grid, Container, Typography, CssBaseline, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InstagramIcon from '@material-ui/icons/Instagram';
import './Profile.css'

declare var kakao:any

const Profile = ( props:any ) => {

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [addr, setAddr] = useState('');
  const [myImg, setMyImg] = useState(new Blob());
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

   useEffect(() => { 
    //console.log(user);
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
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    balloon: {
      margin: theme.spacing(2),
      alignItems: 'center',
      fontSize: '10px',
    },
  }));
  const classes = useStyles();
  // ********
  
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              {user.profileImg === 'default.jpg' ?            
              <Avatar alt="프로필사진" className={classes.large} >
                  <InstagramIcon fontSize='large' />
              </Avatar>
              :
              <Avatar alt="프로필사진" src="data:image/jpeg;base64,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" 
                  className={classes.large} />
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="arrow_box">
                <TextField className={classes.balloon}
                  InputProps={{ disableUnderline: true }} 
                  multiline={true} rows={5}
                  placeholder="소개글을 적어주세요!"
                  />
              </div>
            </Grid>
        </Grid>

        <hr style={{
          height: .9,
        }}/>

        <Grid container spacing={2}>

            {/* 성 함 */}
            <Grid item xs={12} sm={4}>
            <TextField
                id="name" label="성 함" name="name" required fullWidth
                variant="outlined"
                inputProps={{
                  readOnly: true,
                }}
                value={user.name} />
            </Grid>

            {/* 생일년도 */}
            <Grid item xs={12} sm={4}>
            <TextField
                id="birth"  label="생일년도" name="birth" required fullWidth 
                variant="outlined"  
                type="number"
                inputProps={{
                  readOnly: true,
                }}
                value={user.birth} />
            </Grid>

            {/* 성 별 */}
            <Grid item xs={12} sm={4}>
                <TextField
                variant="outlined" required fullWidth
                id="gender" label="성별" name="gender"
                inputProps={{
                  readOnly: true,
                }}
                value={user.gender === 1 ? '남자' : '여자'}
                />
            </Grid>

            {/* 핸드폰 번호 */}
            <Grid item xs={12}>
                <TextField
                variant="outlined" required fullWidth
                id="phone" label="핸드폰 번호" name="phone"
                inputProps={{
                  readOnly: true,
                }}
                value={user.phone}
                />
            </Grid>
            
            {/* 주소 */}
            <Grid item xs={12}>
                <TextField
                variant="outlined" required fullWidth
                inputProps={{
                  readOnly: true,
                }}
                id="addr" label="지역" name="addr" value={user.addr} />
            </Grid>
        </Grid>
        

        {/* Register Submit */}
        <Button
          type="submit"  fullWidth variant="contained" color="primary" 
          className={classes.submit}  >
          수정하기
        </Button>
      </div>
    </Container>
  )
}

export default Profile
