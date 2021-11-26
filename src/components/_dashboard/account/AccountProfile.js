import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Container,
  Typography
} from '@material-ui/core';
// Components
import Page from '../../Page';
import useCurrentUser from '../../../utils/useCurrentUser';

//
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const getUser = (setUser, userId, token) =>
  fetch(`${prodUrl}/api/v1/users/${userId}`, {
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ one USERS response json', json);
      setUser(json);
    })
    .catch((error) => {
      console.error(error);
    });

export default function AccountProfile() {
  const [user, setUser] = useState([]);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    console.log('useEffect', user);
    console.log('LZ Token ', currentUser.token);
    getUser(handleUser, currentUser.id, currentUser.token);
  }, []);
  const handleUser = (response) => {
    console.log('set user', response);
    setUser(response.user);
  };
  return (
    <Page title="User | Learning-Zone">
      <Container index>
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Avatar
                src={user.avatar}
                sx={{
                  height: 100,
                  width: 100
                }}
              />
              <Typography color="textPrimary" gutterBottom variant="h3">
                {user.username}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`${user.type} ${user.fullName}`}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`${moment().format('hh:mm A')} ${user.timezone}`}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color="primary" fullWidth variant="text">
              Modificar
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Page>
  );
}
