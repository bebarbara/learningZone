import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
  Grid,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
// components
import useCurrentUser from '../utils/useCurrentUser';
import { redirectToMercadoPago } from '../utils/redirectToMercadoPago';
import Page from '../components/Page';

// ----------------------------------------------------------------------
// Controller functions

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const getEventDetails = (eventId, setEvent) =>
  fetch(`${prodUrl}/api/v1/events/${eventId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Event response json', json);
      setEvent(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getFamily = (userId, token, setFamily) =>
  fetch(`${prodUrl}/api/v1/users/family?user_id=${userId}`, {
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ User Family response json', json);
      setFamily(json.family);
    })
    .catch((error) => {
      console.error(error);
    });

// ----------------------------------------------------------------------
// Helper Components

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

function FlashMessage({ res: status, message }) {
  // TODO: add a flash message styles
  const textColor = status === 'ok' ? 'green' : 'red';
  return <Box sx={{ color: textColor }}>{message}...</Box>;
}

function UserItem({ user }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {user && (
        <Box
          component="img"
          alt={user.fullName}
          src={user.avatarUrl}
          sx={{ width: 48, height: 48, borderRadius: 2.5 }}
        />
      )}
      {user && (
        <Box sx={{ minWidth: 240 }}>
          <RouterLink to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {user.fullName}
            </Typography>
          </RouterLink>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {`Tiene ${user.followersCount} seguidores`}
          </Typography>
        </Box>
      )}
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        Creador
      </Typography>
    </Stack>
  );
}

function AttendanceButton(props) {
  const { price } = props;
  const priceText = `($ ${price})`;
  return (
    <Button variant="contained" startIcon={<Icon icon={plusFill} />} sx={{ mr: 3 }} {...props}>
      {`Asignar ${!price || price === 0 ? '' : priceText}`}
    </Button>
  );
}

// ----------------------------------------------------------------------
// Main component

export default function EventDetails() {
  const { currentUser } = useCurrentUser();
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [hijos, setHijos] = useState([]);
  const [flashMsg, setFlashMsg] = useState('');
  const [childId, setChildId] = useState('');
  const [preferenceId, setPreferenceId] = useState('');

  useEffect(() => {
    console.log('event details', id);
    getEventDetails(id, handleSetEvent);
    getFamily(currentUser.id, currentUser.token, setHijos);
    console.log('hijos?', hijos);
  }, []);

  const handleSetEvent = (response) => {
    console.log('set event');
    setEvent(response);
  };

  const handleCreateAttendance = (price) => {
    console.log('Creating attendance');
    const data = {
      attendance: {
        userId: childId,
        eventId: event.id,
        createdBy: currentUser.id,
        paymentAccepted: price === 0
      }
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`${prodUrl}/api/v1/attendances`, params)
      .then((response) => response.json())
      .then((json) => {
        console.log('Created attendance', json);
        if (json.status === 'ok') {
          const { assignment } = json;
          setPreferenceId(assignment.preferenceId);
          redirectToMercadoPago(preferenceId);
        }
        // TODO: redirect to attendances page
        setFlashMsg(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChildSelect = (event) => {
    setChildId(event.target.value);
  };

  return (
    <Page title="Detalles del evento | Learning Zone">
      {event && (
        <Container>
          <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" align="center" gutterBottom>
              ¡Los eventos ayudan a aumentar la capacidad de socialización!
            </Typography>
          </Stack>
          {flashMsg && <FlashMessage res={flashMsg} />}
          <Grid item xs={12}>
            <Card>
              <CardHeader title={event.title} subheader="Evento público" />
              <Divider style={{ paddingTop: 10 }} />

              {/* Body */}
              <Box sx={{ p: 3, pb: 1 }} dir="ltr" style={{ marginBottom: 10 }}>
                <UserItem key={`author-${event.id}`} user={event.author} />
                <Typography variant="h6" sx={{ pt: 4 }}>
                  Descripción
                </Typography>
                <Typography variant="body2" sx={{ pt: 3 }}>
                  {event.description}
                </Typography>
                <Typography variant="h6" sx={{ pt: 3 }}>
                  Dirección del evento
                </Typography>
                <Typography variant="body1" sx={{ pt: 3 }}>
                  {event.address}
                </Typography>
                <Typography variant="h6" sx={{ pt: 3 }}>
                  Día y hora del evento
                </Typography>
                <Typography variant="body1" sx={{ pt: 3 }}>
                  {event.time}
                </Typography>

                {/* Actions  */}
                <Box sx={{ minWidth: 120, mt: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel id="child-id-selector">Hijo</InputLabel>
                    <Select
                      labelId="child-id-selector"
                      id="child-id-select"
                      value={childId}
                      label="Seleccionar hijo"
                      onChange={handleChildSelect}
                    >
                      {hijos &&
                        hijos.map((child) => (
                          <MenuItem key={`child-${id}`} value={child.id}>
                            {child.fullName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ pt: 2 }}>
                  {childId && (
                    <AttendanceButton
                      to="#"
                      onClick={handleCreateAttendance(event.price)}
                      price={event.price}
                    />
                  )}
                  {!childId && <AttendanceButton to="#" price={event.price} disabled />}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
