import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontramos lo que buscabas
      </Typography>
      <Typography variant="body2" align="center">
        No hay resultados para tu consulta en estos momentos. Vuelve más tarde o intenta otra
        búsqueda.
      </Typography>
    </Paper>
  );
}
