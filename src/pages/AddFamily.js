import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography, Checkbox, TableCell } from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
// import { RegisterForm } from '../components/authentication/register';
import RegisterFormAddFamily from '../components/authentication/RegisterFormAddFamily';
import { FamilyListToolbar } from '../components/_dashboard/families';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function AddFamily() {
  const [setFilterName] = useState('');
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const [selected, setSelected] = useState([]);
  // const [orderBy, setOrderBy] = useState('name');
  const [filterName] = useState('');
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <RootStyle title="Agregar | Learning-Zone">
      <AuthLayout />
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 0, mb: 5 }}>
            El aprendizaje es experiencia. Todo lo demás es información.
          </Typography>
          <img alt="register" src="/static/illustrations/virtualClass.jpg" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 0 }}>
            <Typography variant="h4" gutterBottom>
              Busque a su familiar
            </Typography>
          </Box>
          <FamilyListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Box sx={{ mb: 0 }}>
            <Typography sx={{ color: 'text.primary' }}>O agregue al menos de edad</Typography>
          </Box>
          <br />
          <RegisterFormAddFamily />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Al Agregar, acepto&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terminos del servicio
            </Link>
            &nbsp;y&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Políticas de privacidad
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
