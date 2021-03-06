import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Button, Container, Stack, Typography, Tabs, Tab, Box } from '@material-ui/core';
// components
import useCurrentUser from '../utils/useCurrentUser';
import Page from '../components/Page';
import {
  EventSort,
  EventList,
  // EventCartWidget,
  EventFilterSidebar
} from '../components/events';
//
// import PRODUCTS from '../_mocks_/products';

// ---------------------------------------------------------------------

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const getAllEvents = (setEvents) =>
  fetch(`${prodUrl}/api/v1/events`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events response json', json);
      setEvents(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyAttendings = (userId, setAttendings) =>
  fetch(`${prodUrl}/api/v1/users/${userId}/events?attendances=true`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Attendings response json', json);
      setAttendings(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyEvents = (userId, setMyEvents) =>
  fetch(`${prodUrl}/api/v1/users/${userId}/events`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ My Events response json', json);
      setMyEvents(json);
    })
    .catch((error) => {
      console.error(error);
    });

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { currentUser } = useCurrentUser();
  const [openFilter, setOpenFilter] = useState(false);
  const [tabValue, setTabValue] = useState('one');
  const [events, setEvents] = useState([]);
  const [attendingEvents, setAttendingsEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    console.log('useEffect', events);
    getAllEvents(handleSetEvents);
  }, []);

  const handleSetEvents = (response) => {
    console.log('set Events', response);
    setEvents(response.events);
  };

  const handleSetAttendings = (response) => {
    console.log('set Attendings', response);
    setAttendingsEvents(response.events);
  };

  const handleSetMyEvents = (response) => {
    console.log('set My Events', response);
    setMyEvents(response.events);
  };

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 'one') {
      getAllEvents(handleSetEvents);
    }
    if (newValue === 'two') {
      getAllMyAttendings(currentUser.id, handleSetAttendings);
    }
    if (newValue === 'three') {
      getAllMyEvents(currentUser.id, handleSetMyEvents);
    }
    setTabValue(newValue);
  };

  return (
    <Page title="Eventos -  Learning Zone Argentina">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            ??Los eventos de Learning Zone a tu alcance!
          </Typography>
          {tabValue === 'three' && (
            <Button
              variant="contained"
              component={RouterLink}
              to="create"
              startIcon={<Icon icon={plusFill} />}
            >
              Crear un evento
            </Button>
          )}
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <EventFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <EventSort />
          </Stack>
        </Stack>

        <Box sx={{ width: '100%', marginBottom: 8 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de eventos">
            <Tab
              value="one"
              label="Todos"
              // wrapped
            />
            <Tab value="three" label="Creados por m??" />
            <Tab value="two" label="Pr??ximos eventos" />
          </Tabs>
        </Box>

        {tabValue === 'one' && <EventList events={events} />}
        {tabValue === 'two' && <EventList events={attendingEvents} />}
        {tabValue === 'three' && <EventList events={myEvents} />}

        {/* <EventCartWidget /> */}
      </Container>
    </Page>
  );
}
