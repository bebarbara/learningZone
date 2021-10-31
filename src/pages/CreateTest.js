import { useState } from 'react';
import {
  Button,
  Container,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import Page from '../components/Page';

// ---------------------------------------------------------------------

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const createTest = async (dataContent, handleResponse) => {
  const data = {
    test: dataContent
  };
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  return fetch(`${prodUrl}/api/v1/tests`, params)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Tests creation json', json);
      handleResponse(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

const defaultValues = {
  subject: '',
  grade: 1,
  description: '',
  program: '',
  questions: [],
  public: true,
  userId: 1, // TODO: update for current_user id
  price: 0
};

// ---------------------------------------------------------------------
// Main component

export default function CreateTest() {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSubmit = (test) => {
    test.preventDefault();
    console.log('sending test', formValues);
    createTest(formValues, handleResponse);
  };

  const handleResponse = (response) => {
    console.log('Created test response', response);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log('name and value', { name, value });
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    // console.log('name and value', { name, checked });
    setFormValues({
      ...formValues,
      [name]: checked
    });
  };

  return (
    <Page title="Crear un examen | Learning Zone">
      <Container sx={{ width: '100%' }}>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Crear exámenes
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" justifyContent="space-between">
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="subject">Materia</FormLabel>
              <TextField
                name="subject"
                type="text"
                defaultValue={formValues.subject}
                helperText="El nombre de la materia."
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="grade">Edad recomendada</FormLabel>
              <TextField
                name="grade"
                type="number"
                defaultValue={formValues.grade}
                helperText="Este edad servirá de referencia para saber el nivel del examen."
                onChange={handleInputChange}
                min={0}
                max={18}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <TextField
                name="description"
                defaultValue={formValues.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="program">Programa cubierto</FormLabel>
              <TextField
                name="program"
                defaultValue={formValues.program}
                helperText="Aquí puedes listar todos los temas cubiertos por el examen."
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
                helperText="Si tu examen es gratuito el valor es 0 (cero)."
                min="0"
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControlLabel
              style={{ margin: 15 }}
              control={<Checkbox name="public" defaultChecked onChange={handleCheckChange} />}
              label="Examen público"
            />
          </Grid>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            type="submit"
            // onClick={handleSubmit}
          >
            Crear examen
          </Button>
        </form>
      </Container>
    </Page>
  );
}
