import React, { useState, Component } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@material-ui/core';
import { Form } from 'formik';
import { b64toBlob } from './ConvertToBlob';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: 'user'
};

export const WebcamCapture = () => {
  const [image, setImage] = useState('');
  const [imgbb, setImgbb] = useState('');
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    uploadImageToImgbb(imageSrc);
  });
  const uploadImageToImgbb = (image) => {
    const data = new FormData();
    const key = 'c684741b642adfc0ca6fbe105f6de776';
    data.append('image', b64toBlob(image.split(',')[1], 'image/jpeg'));
    return fetch(`https://api.imgbb.com/1/upload?key=${key}&expiration=600`, {
      method: 'POST',
      body: data
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('Imgbb response', json);
        setImgbb(json.data);
        uploadImageToBackend(image, json.data.display_url);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const uploadImageToBackend = (image, displayUrl) => {
    const dataBack = new FormData();
    dataBack.append('recognitionPicture[assignmentId]', 1);
    dataBack.append('recognitionPicture[subject]', displayUrl);
    dataBack.append('recognitionPicture[image]', b64toBlob(image.split(',')[1], 'image/jpeg'));
    return fetch('http://localhost:3001/api/v1/recognition_pictures', {
      method: 'POST',
      body: dataBack
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('LZ API response', json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
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
