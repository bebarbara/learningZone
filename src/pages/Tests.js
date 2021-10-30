import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography, Box, Tabs, Tab } from '@material-ui/core';
// components
import Page from '../components/Page';
import { TestCard } from '../components/tests';

// ----------------------------------------------------------------------

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const getAllTests = (setTests) =>
  fetch(`${prodUrl}/api/v1/tests`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Tests response json', json);
      setTests(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyAssignments = (setAssignments) =>
  fetch(`${prodUrl}/api/v1/users/1/assignments`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Assignments response json', json);
      setAssignments(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyTests = (setMyTests) =>
  fetch(`${prodUrl}/api/v1/users/1/tests`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ My Tests response json', json);
      setMyTests(json);
    })
    .catch((error) => {
      console.error(error);
    });

// ----------------------------------------------------------------------

export default function Tests() {
  const [tabValue, setTabValue] = useState('one');
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // console.log('useEffect', tests);
    getAllTests(handleSetTests);
  }, []);

  const handleSetTests = (response) => {
    console.log('set Tests', response);
    setTests(response.tests);
  };

  const handleSetAssignments = (response) => {
    console.log('set Assignments', response);
    setTests([]);
  };

  const handleSetMyTests = (response) => {
    console.log('set My Tests', response);
    setTests(response.tests);
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 'one') {
      getAllTests(handleSetTests);
    }
    if (newValue === 'two') {
      getAllMyAssignments(handleSetAssignments);
    }
    if (newValue === 'three') {
      getAllMyTests(handleSetMyTests);
    }
    setTabValue(newValue);
  };

  return (
    <Page title="Exámenes | Learning Zone Argentina">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            ¡En Learning Zone tenés a disposición tus exámenes y los de la comunidad!
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Crear un examen
          </Button>
        </Stack>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de exámenes">
            <Tab
              value="one"
              label="Todos los exámenes"
              // wrapped
            />
            <Tab value="two" label="Exámenes asignados por mí" />
            <Tab value="three" label="Exámenes creados por mí" />
          </Tabs>
        </Box>

        {tabValue === 'one' && <TestCard tests={tests} />}
        {tabValue === 'two' && <TestCard tests={tests} />}
        {tabValue === 'three' && <TestCard tests={tests} managedByMe />}
      </Container>
    </Page>
  );
}
