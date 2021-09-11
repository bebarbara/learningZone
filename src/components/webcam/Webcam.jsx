import axios from 'axios';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@material-ui/core';
import { Form } from 'formik';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: 'user'
};

export const WebcamCapture = () => {
  const [image, setImage] = useState('');
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });
  const submitImage = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:400/api/imageReconnection', {
      idUser: '32',
      idTest: '45',
      image: setImage
    });
    console.log(res);
    e.preventDefault();
  };

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === '' ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt="for sell" />
        )}
      </div>
      <div>
        {image !== '' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage('');
            }}
            className="webcam-btn"
          >
            Volver a tomar
          </button>
        ) : (
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              capture();
              submitImage(e);
            }}
            className="webcam-btn"
          >
            Capturar
          </Button>
        )}
      </div>
    </div>
  );
};
