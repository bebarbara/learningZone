import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

UsersNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function UsersNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No hay usuarios para mostrar
      </Typography>
      <Typography variant="body2" align="center">
        No hay resultados.
      </Typography>
    </Paper>
  );
}
