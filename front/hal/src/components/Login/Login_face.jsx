import {useEffect} from 'react';
import * as faceapi from 'face-api.js';
import * as React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(()=>({
  body: {
    margin: '0',
    padding: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    position: 'absolute',
  },
}))



const Login_face = () => {
  const classes = useStyles()
  let videoRef = React.createRef();


  // const video = document.getElementById('video')
  const video = React.createRef()
  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ])
    // .then(res=>{console.log("dd",res)})
    .then(startVideo)
  }, [])

  async function startVideo() {
    const video = videoRef.current;
    const constraints = { video: true }
    navigator.mediaDevices.getUserMedia(constraints).then(
      (stream) => { video.srcObject = stream })
    
    // navigator.getUserMedia(
    //   { video: {} },
    //   stream => video.srcObject = stream,
    //   err => console.error(err)
    // )

    // navigator.mediaDevices.getUserMedia({ video : true }).then((stream) => {
    //   if(this.video.current) {
    //     this.video.current.srcObject = stream;
    //     // this.video.current.play();
    //   }
    // })
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
  
    video.addEventListener('play', async() => {
     var repeat = setInterval(async () => {
        //영상에서 얼굴을 식별한다
      const detections = await faceapi.detectAllFaces(video).
                                  withFaceLandmarks().withFaceDescriptors()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      const result = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
  
      result.forEach((result, i) => {
        const box = resizedDetections[i].detection.box
        const drawBox = new faceapi.draw.DrawBox(box, {label: result.toString()})
        // drawBox.draw(canvas)
            // console.log(result._label) 사진이름
            // console.log(result._distance) distance값
        if(result._label=='01055679257'&&result._distance<0.4) {
          document.body.append('로그인 성공')
          clearInterval(repeat)
          // console.log('로그인 성공')
        }else {
          setTimeout(() => {
            console.log('10초::로그인 실패')
            document.body.append('로그인 실패')
            clearInterval(repeat);
           },10000);
        }
      })
      }, 100)
    })
  }
  
  function loadLabeledImage() {
      // 여기에 번호
      const labels = ['1','2']
      labels.push('01055679257')
      console.log(typeof(labels))
      return Promise.all(
          labels.map(async label => {
              const description = []
              const img = await faceapi.fetchImage('user_img/' + label + '.jpg')
              const detections = await faceapi.detectSingleFace(img)
                                  .withFaceLandmarks()
                                  .withFaceDescriptor()
              description.push(detections.descriptor)
              return new faceapi.LabeledFaceDescriptors(label, description)
          })
      )
  }        
  return (
    <div>
      <video id="video" width="180" height="140" ref={videoRef} autoPlay muted/>
    </div>
  );
}

export default Login_face
