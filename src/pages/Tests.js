import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography, Box, Tabs, Tab } from '@material-ui/core';
// components
import useCurrentUser from '../utils/useCurrentUser';
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

const getAllMyAssignments = (userId, setAssignments) =>
  fetch(`${prodUrl}/api/v1/users/${userId}/tests?assignments=true`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Assignments response json', json);
      setAssignments(json);
    })
    .catch((error) => {
      console.error(error);
    });

const getAllMyTests = (userId, setMyTests) =>
  fetch(`${prodUrl}/api/v1/users/${userId}/tests`)
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
  const { currentUser } = useCurrentUser();
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
    setTests(response.tests);
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
      getAllMyAssignments(currentUser.id, handleSetAssignments);
    }
    if (newValue === 'three') {
      getAllMyTests(currentUser.id, handleSetMyTests);
    }
    setTabValue(newValue);
  };

  return (
    <Page title="Ex??menes | Learning Zone Argentina">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            ??En Learning Zone ten??s a disposici??n tus ex??menes y los de la comunidad!
          </Typography>
          {tabValue === 'three' && (
            <Button
              variant="contained"
              component={RouterLink}
              to="create"
              startIcon={<Icon icon={plusFill} />}
            >
              Crear un examen
            </Button>
          )}
        </Stack>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de ex??menes">
            <Tab
              value="one"
              label="Todos"
              // wrapped
            />
            <Tab value="three" label="Creados por m??" />
            <Tab value="two" label="Asignados por m??" />
          </Tabs>
        </Box>

        {tabValue === 'one' && <TestCard tests={tests} />}
        {tabValue === 'two' && <TestCard tests={tests} />}
        {tabValue === 'three' && <TestCard tests={tests} managedByMe />}
      </Container>
    </Page>
  );
}
