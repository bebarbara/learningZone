import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  ButtonBase,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import useCurrentUser from '../utils/useCurrentUser';
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
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    body: dataContent
  };
  return fetch(`${prodUrl}/api/v1/events`, params)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events creation json', json);
      handleResponse(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

// ---------------------------------------------------------------------
// Main component

export default function CreateEvent() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    time: '',
    address: '',
    userId: currentUser.id,
    image: null,
    price: 0
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('formValues', formValues);
    const data = new FormData();
    const preData = Object.keys(formValues).map((key) => [key, formValues[key]]);
    preData.forEach((d) => {
      data.append(`event[${d[0]}]`, d[1]);
    });
    // console.log('data to send', data);
    createEvent(data, handleResponse);
  };

  const handleResponse = (response) => {
    console.log('Created event response', response);
    // TODO: manage flash message
    navigate('/homeschooling/events', { replace: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log('name and value', { name, value });
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSetImage = (e) => {
    const { files } = e.target;
    // console.log('change file', files);
    setFormValues({
      ...formValues,
      image: files[0]
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
                helperText="Recordá que el lugar puede ser físico o virtual, así que puedes dejar aquí el link a tu evento."
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 15 }}>
              <FormLabel htmlFor="image">Imagen del evento</FormLabel>
              <TextField
                name="image"
                type="file"
                defaultValue={formValues.image}
                onChange={handleSetImage}
                required
              />
              {/* <ButtonBase
                className={classes.button}
                component="label"
                onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
              >
                <input ref={ref} type="file" accept="image/*" hidden onChange={handleChange} />
              </ButtonBase> */}
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
