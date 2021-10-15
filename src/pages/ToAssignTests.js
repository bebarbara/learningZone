import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Link
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
// import { ExamListHead, ExamListToolbar, ExamMoreMenu } from '../components/_dashboard/exam';
import { ExamListHead, ExamListToolbar, ExamMoreMenu } from '../components/_dashboard/assingTest';
//
// import EXAMLIST from '../_mocks_/tests';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Título', alignRight: false },
  { id: 'grade', label: 'Grado', alignRight: false },
  { id: 'createdBy', label: 'Creador', alignRight: false },
  { id: 'date', label: 'Fecha', alignRight: false },
  { id: 'price', label: 'Precio', alignRight: false },
  { id: 'see', label: 'Ver', alignRight: false }
];
const TABLE_TESTS = [
  {
    id: 1,
    subject: 'Castellano',
    grade: 1,
    user_id: 3,
    createdAt: '2021-09-11T03:42:00.939Z',
    updatedAt: '2021-09-11T03:42:00.939Z',
    createdBy: 2,
    price: 550,
    programa: '',
    description: '',
    status: '',
    public: false,
    questions: [
      {
        question: 'selecciona la palabra esdrújula',
        type: 'one',
        options: ['come', 'escándalo', 'solución', 'cabeza'],
        correct_answer: 'escándalo'
      },
      {
        question: 'selecci0ona la palabra esdrújula',
        type: 'multiple',
        options: ['esdrújula', 'escándalo', 'solución', 'cabeza'],
        correct_answer: ['escándalo', 'esdrújula']
      }
    ]
  }
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

export default function ToAssignTest() {
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
      const newSelecteds = TABLE_TESTS.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TABLE_TESTS.length) : 0;

  const filteredtests = applySortFilter(TABLE_TESTS, getComparator(order, orderBy), filterName);

  const istestNotFound = filteredtests.length === 0;

  return (
    <Page title="Test | Learning-Zone">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            ¡Muy buen trabajo!
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
                  rowCount={TABLE_TESTS.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredtests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, subject, grade, status, createdBy, price, createdAt } = row;
                      const isItemSelected = selected.indexOf(subject) !== -1;

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
                              onChange={(event) => handleClick(event, subject)}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                              <Typography variant="subtitle2" noWrap>
                                {subject}
                              </Typography>
                            </Link>
                          </TableCell>
                          <TableCell align="left">{grade}</TableCell>
                          <TableCell align="left">
                            <Link
                              to="/dashboard/profileOther"
                              color="inherit"
                              underline="hover"
                              component={RouterLink}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {createdBy}
                              </Typography>
                            </Link>
                          </TableCell>
                          <TableCell align="left">{`${moment(createdAt).format('L')} `}</TableCell>
                          <TableCell align="left">{price}</TableCell>
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
            count={TABLE_TESTS.length}
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
