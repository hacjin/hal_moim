import { useEffect } from 'react'
import * as faceapi from 'face-api.js'
import * as React from 'react'
import { Grid } from '@material-ui/core'
const videoStyle = {
  display: 'flex',
  height: '50vh',
  justifyContent: 'center',
  alignItems: 'center',
}

const Login_face = (props) => {
  let videoRef = React.createRef()
  const phone = props.location.state.user.phone
  // const video = React.createRef()

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    ]).then(startVideo)
  }, [])

  async function startVideo() {
    const video = videoRef.current
    const constraints = { video: true }
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream
    })

    // Canvas container 생성
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)

    // 얼굴과 라벨을 매칭
    const labeledFaceDescriptors = await loadLabeledImage()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

    // 영상을 화면에 표시
    //  const canvas = faceapi.createCanvasFromMedia(video)
    //  document.body.append(canvas)
    //  container.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    //  faceapi.matchDimensions(canvas, displaySize)
    // document.body.append("로그인 중 15초 동안 로그인 안될시 메인페이지로?")
    video.addEventListener('play', async () => {
      var repeat = setInterval(async () => {
        //영상에서 얼굴을 식별한다
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        const result = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor))

        result.forEach((result, i) => {
          const box = resizedDetections[i].detection.box
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          // drawBox.draw(canvas)
          // console.log(result._label) 사진이름
          // console.log(result._distance) distance값

          var login_flag = false

          if (result._label === phone && result._distance < 0.4) {
            // document.body.append('로그인 성공')
            login_flag = true
            console.log('로그인 성공')
            console.log('result._label :: ' + result._label)
            console.log('distance :: ' + result._distance)
            clearInterval(repeat)
            console.log(props)

            // 세션에 유저정보 담기
            sessionStorage.setItem('user', props.location.state.user)
            // 페이지 이동
            // props.history.push('/moim');
          } else {
            setTimeout(() => {
              // document.body.append('로그인 실패')
              if (!login_flag) {
                console.log('10초 :: 로그인 실패')
                console.log('result._label :: ' + result._label)
                console.log('distance :: ' + result._distance)
                clearInterval(repeat)
                // props.history.push('/');
              }
            }, 10000)
          }
        })
      }, 100)
    })
  }

  function loadLabeledImage() {
    // 여기에 번호
    const labels = []
    labels.push(phone)
    // console.log(typeof(labels))
    return Promise.all(
      labels.map(async (label) => {
        const description = []
        const img = await faceapi.fetchImage('user_img/' + label + '.png')
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        description.push(detections.descriptor)
        return new faceapi.LabeledFaceDescriptors(label, description)
      })
    )
  }
  return (
    <Grid xs={12} sm={6}>
      <div style={{ background: '#fffcf0' }}>
        <br />
        <h2 style={{ textAlign: 'center', color: '#FDE26C' }}>카메라를 응시해주세요</h2>
        <div style={videoStyle}>
          <video id="video" width="360" height="280" ref={videoRef} autoPlay muted />
        </div>
        <h7 style={{ textAlign: 'center', color: 'Black' }}> 로그인 성공시 자동으로 메인창으로 넘어갑니다 </h7>
        <br />
        <h7 style={{ textAlign: 'center', color: 'Black' }}> 로그인 실패 시 메인페이지로 돌아갑니다 </h7>
        <br />
        <h7 style={{ textAlign: 'center', color: 'Black' }}> 최대 15초 이상 걸릴 수 있으니 기다려주세요 </h7>
        <br />
      </div>
    </Grid>
  )
}

export default Login_face
