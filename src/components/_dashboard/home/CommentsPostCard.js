import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import shareFill from '@iconify/icons-eva/share-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const ImageUrlImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'image',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CommentsPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};
// -- cambiar posicines 0 1 y2
export default function CommentsPostCard({ comment, index }) {
  console.log('barbara post 1 ', comment);
  const { id, comments, userId, createdAt } = comment;
  const latestPostLarge = index === 8;
  const latestPost = index === 9 || index === 10;
  const { pathname } = useLocation();

  console.log('barbaralog');

  return (
    <Grid>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography variant="subtitle2" noWrap>
            {comment}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
