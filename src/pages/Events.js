import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography, Tabs, Tab, Box } from '@material-ui/core';
// components
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

const getAllEvents = (setEvents) =>
  fetch('http://localhost:3001/api/v1/events')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events response json', json);
      setEvents(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyAttendings = (setAttendings) =>
  fetch('http://localhost:3001/api/v1/users/1/assignments')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Attendings response json', json);
      setAttendings(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyEvents = (setMyEvents) =>
  fetch('http://localhost:3001/api/v1/users/1/events')
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
    setAttendingsEvents([]);
  };

  const handleSetMyEvents = (response) => {
    console.log('set My Events', response);
    setMyEvents([]);
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
      getAllMyAttendings(handleSetAttendings);
    }
    if (newValue === 'three') {
      getAllMyEvents(handleSetMyEvents);
    }
    setTabValue(newValue);
  };

  return (
    <Page title="Learningz Zone - Eventos">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          ¡Los eventos de Learning Zone a tu alcance!
        </Typography>

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

        <Box sx={{ width: '100%', marginBottom: 5 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de eventos">
            <Tab
              value="one"
              label="Todos los eventos"
              // wrapped
            />
            <Tab value="two" label="Mis próximos eventos" />
            <Tab value="three" label="Eventos creados por mí" />
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
