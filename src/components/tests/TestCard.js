import { filter } from 'lodash';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import {
  Button,
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
import { TestListHead, TestListToolbar, TestMoreMenu } from '.';
import Label from '../Label';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'subject', label: 'Materia', alignRight: false },
  { id: 'grade', label: 'Grado', alignRight: false },
  { id: 'authorFullName', label: 'Creado por', alignRight: false },
  { id: 'price', label: 'Precio', alignRight: false },
  { id: 'isPublic', label: 'Privacidad', alignRight: false },
  // { id: 'done', label: 'Resuelto', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_test) => _test.subject.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function TestCard({ tests, managedByMe }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('subject');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showFilter, setShowFilter] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tests.map((n) => n.subject);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, subject) => {
    const selectedIndex = selected.indexOf(subject);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, subject);
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

  const handleShowFilter = (value) => {
    setShowFilter(value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tests.length) : 0;

  const filteredTests = applySortFilter(tests, getComparator(order, orderBy), filterName);

  const isTestNotFound = filteredTests.length === 0;

  const { pathname } = useLocation();

  return (
    <Card>
      <TestListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TestListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tests.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              manageable={managedByMe}
            />

            <TableBody>
              {filteredTests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, subject, grade, author, price, isPublic, done } = row;
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
                        {managedByMe && (
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, subject)}
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={subject} src={avatarUrl} /> */}
                          <Typography variant="subtitle2" noWrap>
                            {subject}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{grade}</TableCell>
                      <TableCell align="left">{author.fullName}</TableCell>
                      <TableCell align="left">{price || '0.0'}</TableCell>
                      <TableCell align="left">
                        <Label variant="ghost" color={(isPublic && 'success') || 'warning'}>
                          {isPublic ? 'Público' : 'Privado'}
                        </Label>
                      </TableCell>
                      {/* <TableCell align="left"> */}
                      {/* <Label
                          variant="ghost"
                          color={
                            (status === 'Insuficiente' && 'error') ||
                            (status === 'Suficiente' && 'success') ||
                            (status === 'Resolver' && 'info') ||
                            'warning'
                          }
                        >
                          {sentenceCase(status)}
                        </Label> */}
                      {/* {done}
                      </TableCell> */}
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          component={RouterLink}
                          to={`${pathname}/${id}`}
                          startIcon={<Icon icon={eyeOutline} />}
                        >
                          Detalles
                        </Button>
                        <TestMoreMenu />
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
            {isTestNotFound && (
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
        labelRowsPerPage="Exámenes por página:"
        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count} exámenes`}
        component="div"
        count={tests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
