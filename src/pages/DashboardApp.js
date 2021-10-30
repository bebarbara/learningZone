import { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Stack,
  Link,
  Box,
  Grid,
  Container,
  Tabs,
  Tab,
  Typography,
  Button
} from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import { WebcamCapture } from '../components/webcam/Webcam';
import AccountProfile from '../components/_dashboard/account/AccountProfile';
import AccountProfileDetails from '../components/_dashboard/account/AccountProfileDetails';

// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { MyPostsList, PostsList, Users } from '../components/_dashboard/home';

// ----------------------------------------------------------------------

const getUsersFollowing = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/users/following?id=5')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts1 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });
const getUsersFollers = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/users/followers?id=5')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts2 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });

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
  const [tabValue, setTabValue] = useState('one');
  const [usersFollowing, setUsersFollowing] = useState([]);
  const [usersFollers, setUsersFollers] = useState([]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const submitForm = () => {
    alert('Form submitted');
  };
  useEffect(() => {
    console.log('useEffect', usersFollowing);
    getUsersFollowing(handleUsersFollowing);
  }, []);

  const handleUsersFollowing = (response) => {
    console.log('set Users Followed', response);
    getUsersFollowing(response.following);
  };
  const handleUsersFollers = (response) => {
    console.log('set Users Follers', response);
    setUsersFollers([]);
  };
  const handleTabChange = (post, newValue) => {
    if (newValue === 'one') {
      getUsersFollowing(handleUsersFollowing);
    }
    if (newValue === 'two') {
      getUsersFollers(handleUsersFollers);
    }
    setTabValue(newValue);
  };

  return (
    <Page title="Test | Learning-Zone">
      <MHidden width="mdDown">
        <AccountProfile />
      </MHidden>
      <Stack>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de posts">
                  <Tab value="one" label="Seguidos" />
                  <Tab value="two" label="Seguidores" />
                </Tabs>
              </Box>
              {tabValue === 'one' && <Users users={usersFollowing} wxs={12} wmd={4} />}
              {tabValue === 'two' && <Users users={usersFollers} wxs={12} wmd={4} />}
            </Box>
          </Stack>
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 3, mt: 0, mb: 0 }}>
              Hola, hoy es un buen día para seguir aprendiendo :).
            </Typography>
            <img src="/static/illustrations/class.jpg" alt="login" />
          </SectionStyle>
        </Box>
      </Stack>
    </Page>
  );
}
