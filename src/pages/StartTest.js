import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import SolutionOutlined from '@iconify/icons-ant-design/border-outlined';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Box,
  Grid,
  Table,
  Stack,
  Button,
  Checkbox,
  Container,
  Typography,
  TableContainer,
  FormControlLabel
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { alpha, styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import { ExamListHead, ExamListToolbar, ExamMoreMenu } from '../components/_dashboard/exam';
import { ExamWeeklySales } from '../components/_dashboard/starttest';
//
import EXAMLIST from '../_mocks_/tests';
import TESTLIST from '../_mocks_/testlist';
// import TestQuestion from '../components/_dashboard/sta';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function StartTest() {
  const [selected, setSelected] = useState([]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = EXAMLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const RootStyle = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(7),
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(3, 0),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
  }));
  const RootStyle2 = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(3, 0),
    color: theme.palette.info.darker,
    backgroundColor: theme.palette.info.lighter
  }));
  const RootStyle3 = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(3, 0),
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter
  }));
  const RootStyle4 = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(3, 0),
    color: theme.palette.error.darker,
    backgroundColor: theme.palette.error.lighter
  }));
  const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`
  }));
  const IconWrapperStyle2 = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.info.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
      theme.palette.info.dark,
      0.24
    )} 100%)`
  }));
  const IconWrapperStyle3 = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
      theme.palette.warning.dark,
      0.24
    )} 100%)`
  }));
  const IconWrapperStyle4 = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.error.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
      theme.palette.error.dark,
      0.24
    )} 100%)`
  }));
  const TASKS = [
    'Create FireStone Logo',
    'Add SCSS and JS files if required',
    'Stakeholder Meeting',
    'Scoping & Estimations',
    'Sprint Showcase'
  ];
  const formik = useFormik({
    initialValues: {
      checked: [TASKS[5]]
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { values, handleSubmit } = formik;
  TaskItem.propTypes = {
    item: PropTypes.string,
    checked: PropTypes.bool,
    formik: PropTypes.object
  };
  function TaskItem({ answer, checked, formik, ...other }) {
    const { getFieldProps } = formik;
    return (
      <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
        <FormControlLabel
          control={
            <Checkbox {...getFieldProps('checked')} value={answer} checked={checked} {...other} />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                ...(checked && {
                  color: 'text.disabled',
                  textDecoration: 'line-through'
                })
              }}
            >
              {answer}
            </Typography>
          }
        />
      </Stack>
    );
  }

  return (
    <Page title="Iniciar Test | Learning-Zone">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            No te rindas! podes!
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Salir examen
          </Button>
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <Stack>
                <Container maxWidth="xl">
                  <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      {TESTLIST.map((item) => (
                        <Box>
                          <Grid columns item xs={24} sm={6} md={3}>
                            <ExamWeeklySales question={item.question} />
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                              <RootStyle>
                                <IconWrapperStyle>1</IconWrapperStyle>
                                <Typography variant="h3">{item.answer1}</Typography>
                                <Button color="inherit" component={RouterLink} to="#">
                                  Seleccionar
                                </Button>
                              </RootStyle>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <RootStyle2>
                                <IconWrapperStyle2>2</IconWrapperStyle2>
                                <Typography variant="h3">{item.answer2}</Typography>
                                <Button color="inherit" component={RouterLink} to="#">
                                  Seleccionar
                                </Button>
                              </RootStyle2>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <RootStyle3>
                                <IconWrapperStyle3>3</IconWrapperStyle3>
                                <Typography variant="h3">{item.answer3}</Typography>
                                <Button color="inherit" component={RouterLink} to="#">
                                  Seleccionar
                                </Button>
                              </RootStyle3>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <RootStyle4>
                                <IconWrapperStyle4>4</IconWrapperStyle4>
                                <Typography variant="h3">{item.answer4}</Typography>
                                <Button color="inherit" component={RouterLink} to="#">
                                  Seleccionar
                                </Button>
                              </RootStyle4>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Form>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/entrega"
                      startIcon={<Icon icon={plusFill} />}
                    >
                      Entregar
                    </Button>
                  </FormikProvider>
                </Container>
              </Stack>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Container>
    </Page>
  );
}
