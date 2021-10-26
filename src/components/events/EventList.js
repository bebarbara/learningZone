import PropTypes from 'prop-types';
// material
import { Grid, Box } from '@material-ui/core';
import ShopEventCard from './EventCard';

// ----------------------------------------------------------------------

EventList.propTypes = {
  events: PropTypes.array.isRequired
};

export default function EventList({ events, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {events.length === 0 && (
        <Box sx={{ marginLeft: 5 }}>En estos momentos no hay eventos en la lista. </Box>
      )}
      {events.length > 0 &&
        events.map((event) => (
          <Grid key={event.id} item xs={4} sm={1} md={6}>
            <ShopEventCard event={event} />
          </Grid>
        ))}
    </Grid>
  );
}
