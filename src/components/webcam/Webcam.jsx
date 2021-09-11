import axios from 'axios';
import React, { useState, Component } from 'react';
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
  const im = 'b';
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const im = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    submitImage(im);
  });
  const submitImage = async (img) => {
    console.log(img);
    const formData = new FormData();
    formData.append('imageTest', img);
    formData.append('idUser', '2');
    formData.append('idTest', '2');
    formData.append('content', '');
    const res = await axios
      .post('http://localhost:3001/api/v1/test_image', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
            Acepte condiciones
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
            }}
            className="webcam-btn"
          >
            Acepto condiciones
          </Button>
        )}
      </div>
    </div>
  );
};
