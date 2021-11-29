import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack,
  Grid,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Avatar,
  CardContent
} from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import useCurrentUser from '../../../utils/useCurrentUser';
import Page from '../../Page';
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------
// Controller functions

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const getPostDetails = (postId, setPost) =>
  fetch(`${prodUrl}/api/v1/posts/${postId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Post response json', json);
      setPost(json);
    })
    .catch((error) => {
      console.error(error);
    });

// ----------------------------------------------------------------------
// Helper Components
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

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

function FlashMessage({ res: status, message }) {
  // TODO: add a flash message styles
  const textColor = status === 'ok' ? 'green' : 'red';
  return <Box sx={{ color: textColor }}>{message}...</Box>;
}

function UserItem({ user }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {user && (
        <Box
          component="img"
          alt={user.fullName}
          src={user.avatarUrl}
          sx={{ width: 48, height: 48, borderRadius: 2.5 }}
        />
      )}
      {user && (
        <Box sx={{ minWidth: 240 }}>
          <RouterLink to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {user.fullName}
            </Typography>
          </RouterLink>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {`Tiene ${user.followersCount} seguidores`}
          </Typography>
        </Box>
      )}
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        Creador
      </Typography>
    </Stack>
  );
}

function AttendanceButton(props) {
  const { price } = props;
  const priceText = `($ ${price})`;
  return (
    <Button variant="contained" startIcon={<Icon icon={plusFill} />} sx={{ mr: 3 }} {...props}>
      {`Asignar ${!price || price === 0 ? '($ 0.0)' : priceText}`}
    </Button>
  );
}

// ----------------------------------------------------------------------
// Main component

export default function PostDetails() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [hijos, setHijos] = useState([]);
  const [flashMsg, setFlashMsg] = useState('');
  const [childId, setChildId] = useState('');
  const [preferenceId, setPreferenceId] = useState('');

  useEffect(() => {
    // console.log('Post details', id);
    getPostDetails(id, handleSetPost);
  }, []);

  const handleSetPost = (response) => {
    // console.log('set Post');
    setPost(response);
  };

  const handleCreateAttendance = () => {
    // console.log('Creating attendance. price:', Post.price);
    const data = {
      attendance: {
        userId: childId,
        postId: post.id,
        createdBy: currentUser.id,
        paymentAccepted: post.price === 0 || post.price === null || post.price === 0.0
      }
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(`${prodUrl}/api/v1/attendances`, params)
      .then((response) => response.json())
      .then((json) => {
        console.log('Created attendance', json);
        if (json.status === 'ok') {
          const { attendance } = json;

          return navigate('/homeschooling/events', { replace: true });
        }
        // setFlashMsg(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Page title="Detalles del Post | Learning Zone">
      {post && (
        <Container>
          <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" align="center" gutterBottom>
              ¡Los eventos ayudan a aumentar la capacidad de socialización!
            </Typography>
          </Stack>
          {flashMsg && <FlashMessage res={flashMsg} />}
          <Grid item xs={12}>
            <Card>
              <CardHeader title={post.title} />
              <Divider style={{ paddingTop: 10 }} />

              {/* Body */}

              {/* Actions  */}
              <Box sx={{ minWidth: 120, mt: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="child-id-selector">Hijo</InputLabel>
                  <Select
                    labelId="child-id-selector"
                    id="child-id-select"
                    value={childId}
                    defaultValue=""
                    displayEmpty
                    label="Seleccionar hijo"
                    onChange={(e) => setChildId(e.target.value)}
                  >
                    {hijos &&
                      hijos.map((child) => (
                        <MenuItem key={`child-${id}`} value={child.id}>
                          {child.fullName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ pt: 2 }}>
                {childId && (
                  <AttendanceButton to="#" onClick={handleCreateAttendance} price={post.price} />
                )}
                {!childId && <AttendanceButton to="#" price={post.price} disabled />}
              </Box>
            </Card>
            <Card sx={{ position: 'relative' }}>
              <CardMediaStyle
                sx={{
                  pt: {
                    xs: 'calc(100% * 4 / 3)',
                    sm: 'calc(100% * 3 / 4.66)'
                  }
                }}
              >
                <SvgIconStyle
                  color="paper"
                  src="/static/icons/shape-avatar.svg"
                  sx={{
                    width: 80,
                    height: 36,
                    zIndex: 9,
                    bottom: -15,
                    position: 'absolute'
                  }}
                />
                <AvatarStyle alt={post.author.fullname} src={post.author.avatarUrl} sx={{}} />

                <ImageUrlImgStyle alt={post.title} src={post.imageUrl} />
              </CardMediaStyle>

              <CardContent
                sx={{
                  pt: 4
                }}
              >
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  {fDate(post.createdAt)}
                </Typography>

                <TitleStyle
                  to="#barabra"
                  color="inherit"
                  variant="subtitle2"
                  underline="hover"
                  component={RouterLink}
                  sx={{}}
                >
                  {post.title}
                </TitleStyle>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
