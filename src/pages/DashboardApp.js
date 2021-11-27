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
import useCurrentUser from '../utils/useCurrentUser';

// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { UsersFollowing, UsersFollowers } from '../components/_dashboard/user';

// ----------------------------------------------------------------------
const prodUrl = 'https://learning-zone-poc.herokuapp.com';
const getUsersFollowing = (setPosts, id, token) =>
  fetch(`${prodUrl}/api/v1/users/following?id=${id}`, {
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts1 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });
const getUsersFollers = (setPosts, id, token) =>
  fetch(`${prodUrl}/api/v1/users/followers?id=${id}`, {
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  })
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
  const { currentUser } = useCurrentUser();

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const submitForm = () => {
    alert('Form submitted');
  };
  useEffect(() => {
    console.log('useEffect', usersFollowing);
    getUsersFollowing(handleUsersFollowing, currentUser.id, currentUser.token);
  }, []);

  const handleUsersFollowing = (response) => {
    console.log('set Users Followed', response);
    setUsersFollowing(response.following);
  };
  const handleUsersFollers = (response) => {
    console.log('set Users Follers', response);
    setUsersFollers(response.followers);
  };
  const handleTabChange = (post, newValue) => {
    if (newValue === 'one') {
      getUsersFollowing(handleUsersFollowing, currentUser.id, currentUser.token);
    }
    if (newValue === 'two') {
      getUsersFollers(handleUsersFollers, currentUser.id, currentUser.token);
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
              {tabValue === 'one' && <UsersFollowing users={usersFollowing} wxs={12} wmd={4} />}
              {tabValue === 'two' && <UsersFollowers users={usersFollers} wxs={12} wmd={4} />}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Page>
  );
}
