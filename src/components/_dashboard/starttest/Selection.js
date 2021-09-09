import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import SolutionOutlined from '@iconify/icons-ant-design/border-outlined';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// import LooksOneIcon from '@mui/icons-material/LooksOne';
// import LooksTwoIcon from '@mui/icons-material/LooksTwo';
// import Looks3Icon from '@mui/icons-material/Looks3';
// import Looks4Icon from '@mui/icons-material/Looks4';

//

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(7),
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'stretch',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;
Selection.propTypes = {
  posts: PropTypes.array.isRequired
};
const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 950,
  display: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

export default function Selection(props) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={SolutionOutlined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{props.answer}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {props.answer}
      </Typography>
    </RootStyle>
  );
}
