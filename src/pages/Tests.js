import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { TestCard } from '../components/tests';
//
import EXAMLIST from '../_mocks_/tests';

// ----------------------------------------------------------------------
// API CALLS
// ----------------------------------------------------------------------

export default function Tests() {
  return (
    <Page title="Exámenes | Learning Zone Argentina">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Exámenes
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

        <TestCard tests={EXAMLIST} />
      </Container>
    </Page>
  );
}
