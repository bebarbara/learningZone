import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  // Link,
  Stack,
  // Checkbox,
  TextField,
  IconButton,
  InputAdornment
  // FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useCurrentUser from '../../../utils/useCurrentUser';

// ----------------------------------------------------------------------

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

async function loginUser(credentials) {
  return fetch(`${prodUrl}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Debes ingresar un email válido').required('El email es necesario'),
    password: Yup.string().required('El password es necesario')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
      // remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // console.log('call handle user', values);
      handleSetUser(values);
      // navigate('/dashboard/home', { replace: true });
    }
  });

  const { errors, touched, isSubmitting, setErrors, setSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSetUser = async (values) => {
    // console.log('llega handler user', values);
    const response = await loginUser({ user: { email: values.email, password: values.password } });
    // console.log('LZ Login response json', response);
    if (response.user) {
      // console.log('login', response.user);
      setCurrentUser(response.user);
      return navigate('/homeschooling/home', { replace: true });
    }
    // console.log('entra a errores', response);
    setErrors({
      email: 'Error en las credenciales, verificá tus datos y volvé a intentar',
      password: 'Error en las credenciales, verificá tus datos y volvé a intentar'
    });
    setSubmitting(false);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

          {/* <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Ingresar
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
