import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Box,
  Grid,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
// import { ExamListHead, ExamListToolbar, ExamMoreMenu } from '../components/_dashboard/exam';
import {
  ExamListHead,
  ExamListToolbar,
  ExamMoreMenu,
  ExamNewTests,
  ExamBugReports,
  ExamItemOrders,
  ExamWeeklySales
} from '../components/_dashboard/exam';
//
import EXAMLIST from '../_mocks_/tests';

// ----------------------------------------------------------------------

const TABLE_HEAD2 = [
  { id: 'name', label: 'Título', alignRight: false },
  { id: 'company', label: 'Creador', alignRight: false },
  { id: 'role', label: 'Logro', alignRight: false },
  { id: 'isVerified', label: 'Fecha', alignRight: false },
  { id: 'status', label: 'Estado', alignRight: false },
  { id: '' }
];

const TABLE_HEAD = [
  { id: 'name', label: 'Título', alignRight: false },
  { id: 'grade', label: 'Grado', alignRight: false },
  { id: 'createdBy', label: 'Creador', alignRight: false },
  { id: 'accomplishment', label: 'Logro', alignRight: false },
  { id: 'date', label: 'Fecha', alignRight: false },
  { id: 'status', label: 'Estado', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_test) => _test.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Test() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = EXAMLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EXAMLIST.length) : 0;

  const filteredtests = applySortFilter(EXAMLIST, getComparator(order, orderBy), filterName);

  const istestNotFound = filteredtests.length === 0;

  return (
    <Page title="Examenes | Learning-Zone">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Muy buen trabajo! !Siempre se puede ser mejor¡
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Asignar Examen
          </Button>
        </Stack>
        <Stack>
          <Container maxWidth="xl">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={3}>
                <ExamWeeklySales />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ExamNewTests />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ExamItemOrders />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ExamBugReports />
              </Grid>
            </Grid>
          </Container>
        </Stack>

        <Card>
          <ExamListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ExamListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={EXAMLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredtests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, grade, status, createdBy, accomplishment, date } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{grade}</TableCell>
                          <TableCell align="left">{createdBy}</TableCell>
                          <TableCell align="left">{accomplishment}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === 'Expirado' && 'error') ||
                                'success' ||
                                status === 'Pendiente'
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <ExamMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {istestNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={EXAMLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
