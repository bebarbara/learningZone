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
  Divider
} from '@material-ui/core';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

function UserItem({ user }) {
  const { image, fullName, followers } = user;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={fullName}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <RouterLink to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {fullName}
          </Typography>
        </RouterLink>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {`Tiene ${followers.length} seguidores`}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        Creador
      </Typography>
    </Stack>
  );
}

export default function TestDetails() {
  const { id } = useParams();

  const user = { fullName: 'Julia Espinoza', image: null, followers: [] };
  return (
    <Page title="Detalles de examen | Learning Zone">
      <Container>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" align="center" gutterBottom>
            ¡Los exámenes son una manera efectiva de entrenar tus conocimientos!
          </Typography>
        </Stack>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Subject" subheader="Grade 1" />
            <Divider style={{ paddingTop: 10 }} />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr" style={{ marginBottom: 10 }}>
              <UserItem key={user.fullName} user={user} />
              <Typography variant="body2" sx={{ pt: 4 }}>
                'Description'
              </Typography>
              <Typography variant="body1" sx={{ pt: 3 }}>
                'Program'
              </Typography>
              <Box sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`/assign/${id}`}
                  startIcon={<Icon icon={plusFill} />}
                  sx={{ mr: 3 }}
                >
                  Asignar
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}
