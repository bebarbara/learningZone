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

//

const getUser = (setUser) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/users/5')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ ALL USERS response json', json);
      setUser(json);
    })
    .catch((error) => {
      console.error(error);
    });

export default function AccountProfile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log('useEffect', user);
    getUser(handleUser);
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
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {`${user.city} ${user.country}`}
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
