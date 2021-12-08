import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Checkbox,
  FormControlLabel,
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

const createPost = async (dataContent, handleResponse) => {
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
  return fetch(`${prodUrl}/api/v1/posts`, params)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts creation json', json);
      handleResponse(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

// ---------------------------------------------------------------------
// Main component

export default function CreatePost() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    userId: currentUser.id,
    image: null
  });

  const handleSubmit = (post) => {
    post.preventDefault();
    console.log('formValues', formValues);
    const data = new FormData();
    const preData = Object.keys(formValues).map((key) => [key, formValues[key]]);
    preData.forEach((d) => {
      data.append(`post[${d[0]}]`, d[1]);
    });
    console.log('data to send', data);
    createPost(data, handleResponse);
  };

  const handleResponse = (response) => {
    console.log('Created post response', response);
    // TODO: manage flash message
    navigate('/homeschooling/home', { replace: true });
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
  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    // console.log('name and value', { name, checked });
    setFormValues({
      ...formValues,
      [name]: checked
    });
  };

  return (
    <Page title="Crear un post | Learning Zone">
      <Container sx={{ width: '100%' }}>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Crear publicación
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
                helperText="Hacé que el título sea descriptivo."
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: 10 }}>
              <FormLabel htmlFor="content">Descripción</FormLabel>
              <TextField
                name="content"
                defaultValue={formValues.content}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl style={{ margin: 15 }}>
              <FormLabel htmlFor="image">Imagen de la publicación</FormLabel>
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

            <FormControlLabel
              style={{ margin: 15 }}
              control={<Checkbox name="public" defaultChecked onChange={handleCheckChange} />}
              label="Público"
            />
          </Grid>
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            type="submit"
            // onClick={handleSubmit}
          >
            Crear publicación
          </Button>
        </form>
      </Container>
    </Page>
  );
}
