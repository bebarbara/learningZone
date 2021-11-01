import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider, useField } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/system';

// ----------------------------------------------------------------------
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

async function addfamily(credentials) {
  return fetch(`${prodUrl}/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}

const defaultValues = {
  name: '',
  surname: '',
  userType: '2',
  email: '',
  password: '',
  birthday: '',
  username: '',
  gender: '',
  parentId: 5
};

export default function RegisterFormAddFamily({ setCurrentUser }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Muy corto!')
      .max(50, 'Muy Largo')
      .required('Nombre de Usuario es requerido'),
    firstName: Yup.string()
      .min(2, 'Muy corto!')
      .max(50, 'Muy largo!')
      .required('Nombre es requerido'),
    lastName: Yup.string()
      .min(2, 'Muy corto!')
      .max(50, 'Muy largo!')
      .required('Apellido es requerido'),
    email: Yup.string().email('Email must be a valid email address').required('Email es requerido'),
    password: Yup.string().required('Password es requerida')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      userType: '2',
      email: '',
      password: '',
      birthday: '',
      username: '',
      gender: '',
      parentId: 5
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log('call handle user', values);
      handleSetUser(values);
      // navigate('/dashboard/home', { replace: true });
    }
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
  const [formValues, setFormValues] = useState(defaultValues);

  const handleSetUser = async (values) => {
    // console.log('llega handler user', values);
    const response = await addfamily({
      user: {
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        accept: values.accept
      }
    });
    // console.log('LZ Login response json', response);
    setCurrentUser(response.user);
  };

  const handleResponse = (response) => {
    console.log('Addfamilies response', response);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="Nombre de usuario"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nombre"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Apellido"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Acepto los terminos y condiciones"
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Agregar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
