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
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hola, antes de comenzar tener en cuenta los siguientes item
          </Typography>
          <img src="/static/illustrations/11104.jpg" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Durante el examen se tomar÷an varias fotos para validad la identidad
            </Typography>
            <Typography variant="h4" gutterBottom>
              Por favor, prende la camara y asegurate tener buena luz
            </Typography>
            <Typography variant="h4" gutterBottom>
              <div className="home-container">
                <div className="container">
                  <div className="text">
                    <form className="form">
                      <WebcamCapture />
                      <button type="submit" id="login-button" onClick={(e) => submitForm(e)}>
                        Acepto el uso de la camara web
                      </button>
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
              Iniciar examen
            </Button>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
