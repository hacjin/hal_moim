import React, {useState} from 'react'

import { makeStyles,  Dialog, DialogTitle, DialogContent, Button, } from '@material-ui/core'
import Webcam from 'react-webcam';

const useStyles = makeStyles((theme) => ({
    dialog: {
      textAlign: 'center',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > div': {
        width: '80%',
      },
    },
    input: {
      display: 'none',
    },
    preview: {
      margin: '0px auto',
      backgroundColor: '#efefef',
      width: '300px',
      height: '200px',
    },
}))

const Registface = ( props ) => {
    const classes = useStyles();
    const [ref, setRef] = useState(React.createRef());

    const handleClose = () => {
        props.setOpen(false)
    }

    const handleCapture = () => {
      const imgsrc = props.webcam.getScreenshot();
    }

    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: "user"
    };

    return (
        <div>
            <Dialog
                //
                className={classes.dialog}
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">사진 캡쳐</DialogTitle>
                <DialogContent>
                <div className={classes.root}>
                    {/* <div className={classes.preview}>{imgBase64 === '' ? '' : <img className={classes.preview} src={imgBase64} alt="미리보기" />}</div> */}
                    <input
                    //
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    //onChange={handleImg}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span" onClick={handleCapture}>
                            저장하기
                        </Button>
                    </label>

                    <Webcam 
                      audio={false}
                      height={300}
                      width='100%'
                      //ref={setRef(ref)}
                      videoConstraints={videoConstraints}
                    />
                    <Button variant="contained" color="secondary" component="span" onClick={handleClose}>돌아가기</Button>
                </div>
                </DialogContent>
            </Dialog>
            </div>
    );
}


export default Registface