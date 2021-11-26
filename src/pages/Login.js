import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography } from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
// import AuthSocial from '../components/authentication/AuthSocial';

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

export default function Login({ setCurrentUser }) {
  return (
    <RootStyle title="Login | Learning-Zone">
      <AuthLayout>
        ¿Querés create una cuenta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="register">
          Quiero registrarme
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Bienvenido de nuevo
          </Typography>
          <img
            src="https://i.ibb.co/k27L307/Multicultural-people-standing-together-isolated-flat-vector-illustration-Cartoon-diverse-characters.jpg"
            alt="login"
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Inicio de sesión
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ingresá tus datos aquí.</Typography>
          </Stack>
          {/* <AuthSocial /> */}

          <LoginForm setCurrentUser={setCurrentUser} />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              ¿No tenés una cuenta?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Creala aquí
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
