import { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import Page from '../components/Page';

// ---------------------------------------------------------------------

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const createEvent = async (dataContent, handleResponse) => {
  const data = {
    event: dataContent
  };
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(`${localUrl}/api/v1/events`, params)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events creation json', json);
      handleResponse(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

const defaultValues = {
  title: '',
  description: '',
  time: '',
  address: '',
  userId: 1,
  price: 0
};

// ---------------------------------------------------------------------
// Main component

export default function CreateEvent() {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    createEvent(formValues, handleResponse);
  };

  const handleResponse = (response) => {
    console.log('Created event response', response);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log('name and value', { name, value });
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <Page title="Crear un evento | Learning Zone">
      <Container sx={{ width: '100%' }}>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Crear eventos
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" justifyContent="space-between">
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="title">Título</FormLabel>
              <TextField
                name="title"
                type="text"
                defaultValue={formValues.title}
                helperText="Hacé que el título de tu evento sea divertido."
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <TextField
                name="description"
                defaultValue={formValues.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="time">Fecha y hora del evento</FormLabel>
              <TextField
                name="time"
                type="datetime-local"
                defaultValue={formValues.time}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="address">Lugar del encuentro</FormLabel>
              <TextField
                name="address"
                defaultValue={formValues.address}
                helperText="Recordá que el lugar puede ser físico o virtual, así que puedes dejar aquí el link a tu evento"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 15 }}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <TextField
                name="price"
                type="number"
                defaultValue={formValues.price}
                helperText="Si tu evento es gratuito el valor es 0 (cero)."
                min="0"
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            type="submit"
            // onClick={handleSubmit}
          >
            Crear evento
          </Button>
        </form>
      </Container>
    </Page>
  );
}
