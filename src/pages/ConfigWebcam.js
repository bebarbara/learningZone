import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography, Button } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { WebcamCapture } from '../components/webcam/Webcam';

// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ConfigWebcam() {
  const submitForm = () => {
    alert('Form submitted');
  };

  return (
    <RootStyle title="Test | Learning-Zone">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Antes de comenzar, repasemos las indicaciones.
          </Typography>
          <img src="/static/illustrations/11104.jpg" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              • Durante el proceso estaremos verificando la identidad.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Por favor, asegurate de prender la camara. Y buscar un lugar con buena luz
            </Typography>
            <Typography variant="h4" gutterBottom>
              <div className="home-container">
                <div className="container">
                  <div className="text">
                    <form className="form">
                      <WebcamCapture />
                    </form>
                  </div>
                </div>
              </div>
            </Typography>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              component={RouterLink}
              to="/dashboard/starttest"
            >
              Comenzar test
            </Button>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
