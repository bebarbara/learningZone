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
  maxWidth: 900,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(0, 0, 2, 2)
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

export default function DashboardApp() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const submitForm = () => {
    alert('Form submitted');
  };

  return (
    <RootStyle title="Test | Learning-Zone">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 3, mt: 0, mb: 0 }}>
            Hola, hoy es un buen día para seguir aprendiendo :).
          </Typography>
          <img src="/static/illustrations/class.jpg" alt="login" />
        </SectionStyle>
      </MHidden>
    </RootStyle>
  );
}
