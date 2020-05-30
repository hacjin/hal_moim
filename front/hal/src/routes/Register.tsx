import React, {useState} from 'react'
import { Button, TextField, FormControl, FormLabel, RadioGroup, 
  FormControlLabel, Radio, Select } from '@material-ui/core';
import api from '../apis/api'

declare var kakao:any

const Register = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [addr, setAddr] = useState('');
  const [myImg, setMyImg] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');

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
    setPhone(e.target.value);
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
    .then( (res:any) => console.log(res))

  }

  return (
    <div>
      <h1>회원가입</h1> 
        <table>
          <tr>
            <td>핸드폰번호</td>
            <td><TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handlePhone}/></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleName}/></td>
          </tr>
          <tr>
            <td>생년월일</td>
            <td><Select
                  native
                  value={birth}
                  onChange={handleBirth}
                  label="생일년도"
                >
                  <option aria-label="None" value="" />
                  <option value={1900}>1900</option>
                  <option value={1901}>1901</option>
                  <option value={1902}>1902</option>
                  <option value={1903}>1903</option>
                  <option value={1904}>1904</option>
                </Select></td>
          </tr>
          <tr>
            <td>성별</td>
            <td>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender"  onChange={handleGender} row> 
                  <FormControlLabel value="1" control={<Radio />} label="남자" />
                  <FormControlLabel value="2" control={<Radio />} label="여자" />
                </RadioGroup>
              </FormControl>
            </td>
          </tr>
          <tr>
            <td>주소</td>
            <td><Button id="addr" variant="contained" color="primary" onClick={handleLocation}>내위치 확인</Button></td>
          </tr>
          <tr>
            <td>얼굴 등록 하기</td>
            <td><Button id="addr" variant="contained" color="secondary" >
                <input id={"file-input"}  type="file" name="imageFile" multiple
                  onChange={handleMyImg} />
                  얼굴 등록
                </Button></td>
          </tr>
        </table>
        <Button id="registSubmit" variant="contained" color="primary" onClick={handleSubmit}>등록하기</Button>
    </div>
  )
}

export default Register
