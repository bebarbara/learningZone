import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

const getTestDetails = (testId, setTest) =>
  fetch(`${prodUrl}/api/v1/tests/${testId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Test response json', json);
      setTest(json);
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
          sx={{ width: 48, height: 48, borderRadius: 1.5 }}
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

function AssignmentButton(props) {
  const { price } = props;
  const priceText = `($ ${price})`;
  return (
    <Button variant="contained" startIcon={<Icon icon={plusFill} />} sx={{ mr: 3 }} {...props}>
      {`Asignar ${!price || price === 0 ? '($ 0.0)' : priceText}`}
    </Button>
  );
}

// ----------------------------------------------------------------------
// Main component

export default function TestDetails() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { id } = useParams();
  const [test, setTest] = useState([]);
  const [children, setChildren] = useState([]);
  const [flashMsg, setFlashMsg] = useState('');
  const [childId, setChildId] = useState('');
  const [preferenceId, setPreferenceId] = useState('');

  useEffect(() => {
    // console.log('test details', id);
    getTestDetails(id, handleSetTest);
    getFamily(currentUser.id, currentUser.token, setChildren);
    // console.log('hijos?', children);
  }, []);

  const handleSetTest = (response) => {
    // console.log('set Test', response);
    setTest(response.test);
  };

  const handleCreateAssignment = () => {
    // console.log('Creating assignment. price:', test.price);
    const data = {
      assignment: {
        userId: childId,
        testId: test.id,
        createdBy: currentUser.id,
        paymentAccepted: test.price === 0 || test.price === null || test.price === 0.0
      }
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`${prodUrl}/api/v1/assignments`, params)
      .then((response) => response.json())
      .then((json) => {
        console.log('Created assignment', json);
        if (json.status === 'ok') {
          const { assignment } = json;
          if (assignment.preferenceId) {
            setPreferenceId(assignment.preferenceId);
            return redirectToMercadoPago(preferenceId);
          }
          return navigate('/homeschooling/tests', { replace: true });
        }
        // setFlashMsg(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Page title="Detalles de examen | Learning Zone">
      <Container>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" align="center" gutterBottom>
            ??Los ex??menes son una manera efectiva de entrenar tus conocimientos!
          </Typography>
        </Stack>
        {flashMsg && <FlashMessage res={flashMsg} />}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={test.subject} subheader={`Edad aproximada ${test.grade}`} />
            <Divider style={{ paddingTop: 10 }} />

            {/* Body */}
            <Box sx={{ p: 3, pb: 1 }} dir="ltr" style={{ marginBottom: 10 }}>
              <UserItem key={`author-${test.id}`} user={test.author} />
              <Typography variant="h6" sx={{ pt: 4 }}>
                Descripci??n
              </Typography>
              <Typography variant="body2" sx={{ pt: 3 }}>
                {test.description}
              </Typography>
              <Typography variant="h6" sx={{ pt: 3 }}>
                Programa cubierto por el examen
              </Typography>
              <Typography variant="body1" sx={{ pt: 3 }}>
                {test.program}
              </Typography>

              {/* Actions  */}
              <Box sx={{ minWidth: 120, mt: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="child-id-selector">Hijo</InputLabel>
                  <Select
                    labelId="child-id-selector"
                    id="child-id-select"
                    value={childId}
                    defaultValue=""
                    displayEmpty
                    label="Seleccionar hijo"
                    onChange={(e) => setChildId(e.target.value)}
                  >
                    {children &&
                      children.map((child) => (
                        <MenuItem key={`child-${id}`} value={child.id}>
                          {child.fullName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ pt: 2 }}>
                {childId && (
                  <AssignmentButton to="#" onClick={handleCreateAssignment} price={test.price} />
                )}
                {!childId && <AssignmentButton to="#" price={test.price} disabled />}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}
