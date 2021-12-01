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
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../utils/useCurrentUser';
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

// ---------------------------------------------------------------------
// Main component

export default function CreateTest() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [formValues, setFormValues] = useState({
    subject: '',
    grade: 1,
    description: '',
    program: '',
    questions: [],
    public: true,
    userId: currentUser.id,
    price: 0
  });
  const [questionsFields, setQuestionsFields] = useState([
    { name: uuidv4(), label: '', type: 'radio-group', options: [], value: [], answers: [] }
  ]);
  const questionsTypes = [
    { option: 'radio-group', description: 'Una respuesta' },
    { option: 'checkbox-group', description: 'Selección múltiple' },
    { option: 'text', description: 'Texto' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    formValues.questions = JSON.stringify(questionsFields);
    console.log('sending test', formValues);
    // console.log('InputFields', questionsFields);
    createTest(formValues, handleResponse);
  };

  const handleResponse = (response) => {
    console.log('Created test response', response);
    navigate('/homeschooling/tests', { replace: true });
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

  const handleChangeQuestions = (event) => {
    const { name, value, id } = event.target;
    // console.log('lala questions', name, value, id);

    const newInputFields = questionsFields.map((i) => {
      if (id === i.name) {
        // console.log('es options o answers 1', i[name], i.name);
        if (name === 'options' || name === 'answers') {
          i[name] = value.split(',').map((val) => val.trim());
          // console.log('es options o answers ', i[name]);
        } else {
          i[name] = value;
        }
      }
      return i;
    });
    setQuestionsFields(newInputFields);
  };

  const handleAddFields = () => {
    setQuestionsFields([
      ...questionsFields,
      { name: uuidv4(), label: '', type: 'radio-group', options: [], value: '', answers: [] }
    ]);
  };

  const handleRemoveFields = (id, event) => {
    const values = [...questionsFields];
    values.splice(
      values.findIndex((value) => value.name === id),
      1
    );
    setQuestionsFields(values);
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
            {questionsFields.map((inputField) => (
              // label: '', type: '', options: [], value: '', answers: []
              // <FormControl style={{ margin: 15 }}>
              <div key={inputField.name}>
                <FormControl style={{ margin: 5 }}>
                  <TextField
                    name="type"
                    label="Tipo de respuesta"
                    id={inputField.name}
                    // variant="filled"
                    value={inputField.type}
                    select
                    SelectProps={{ native: true }}
                    onChange={handleChangeQuestions}
                  >
                    {questionsTypes.map((type) => (
                      <option key={type.option} name={type.option} value={type.option}>
                        {type.description}
                      </option>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl style={{ margin: 5 }}>
                  <TextField
                    name="label"
                    label="Pregunta"
                    id={inputField.name}
                    // variant="filled"
                    value={inputField.label}
                    onChange={handleChangeQuestions}
                  />
                </FormControl>
                {inputField.type !== 'text' && (
                  <FormControl style={{ margin: 5, width: '230px' }}>
                    <TextField
                      name="options"
                      label="Opciones de respuesta entre comas."
                      id={inputField.name}
                      // variant="filled"
                      value={inputField.options}
                      onChange={handleChangeQuestions}
                    />
                  </FormControl>
                )}
                {inputField.type !== 'text' && (
                  <FormControl style={{ margin: 5, width: '301px' }}>
                    <TextField
                      name="answers"
                      label="Respuestas correctas. Entre comas si son 2+ correctas"
                      id={inputField.name}
                      // variant="filled"
                      value={inputField.answers}
                      onChange={handleChangeQuestions}
                    />
                  </FormControl>
                )}
                <FormControl style={{ margin: 5 }}>
                  <IconButton
                    disabled={questionsFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.name)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </FormControl>
                <FormControl style={{ margin: 5 }}>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </FormControl>
              </div>
              // </FormControl>
            ))}
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
