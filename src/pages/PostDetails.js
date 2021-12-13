import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
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
  FormLabel,
  TextField,
  CardContent
} from '@material-ui/core';
// utils
import { fDate } from '../utils/formatTime';
import { fShortenNumber } from '../utils/formatNumber';
// components
import useCurrentUser from '../utils/useCurrentUser';
import Page from '../components/Page';
import SvgIconStyle from '../components/SvgIconStyle';
import { CommentsPostCard } from '../components/_dashboard/home';

// ----------------------------------------------------------------------
// Controller functions

const localUrl = 'http://localhost:3001';
const prodUrl = 'https://learning-zone-poc.herokuapp.com';
const createComent = async (dataContent, handleResponse) => {
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
  return fetch(`${prodUrl}/api/v1/comments`, params)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ comments creation json1', json);
      handleResponse(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getPostDetails = (postId, setPost) =>
  fetch(`${prodUrl}/api/v1/posts/${postId}`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Post auhor id response json', json);
      setPost(json);
      console.log('LZ Post  id response json', json.post);
    })
    .catch((error) => {
      console.error(error);
    });

const getPostComments = (postId, setComments) =>
  fetch(`${prodUrl}/api/v1/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Post  comments  response json', json);
      setComments(json);
      console.log('LZ Post  id response json', json.comments);
    })
    .catch((error) => {
      console.error(error);
    });
// ----------------------------------------------------------------------
// Helper Components
const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 1 / 1)'
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
  const [comments, setComments] = useState([]);
  const [hijos, setHijos] = useState([]);
  const [flashMsg, setFlashMsg] = useState('');
  const [childId, setChildId] = useState('');
  const [preferenceId, setPreferenceId] = useState('');
  const [formValues, setFormValues] = useState({
    comment: '',
    userId: currentUser.id,
    postId: id
  });
  const { author } = post;

  useEffect(() => {
    // console.log('Post details', id);
    getPostDetails(id, handleSetPost);
    getPostComments(id, handleSetComments);
  }, []);

  const handleSetPost = (response) => {
    // console.log('set Post', response);
    setPost(response.post);
  };
  const handleSetComments = (response) => {
    // console.log('set Post', response);
    setComments(response.comments);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log('name and value', { name, value });
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (post) => {
    post.preventDefault();
    console.log('formValues bar', formValues);
    const data = new FormData();
    const preData = Object.keys(formValues).map((key) => [key, formValues[key]]);
    preData.forEach((d) => {
      data.append(`comment[${d[0]}]`, d[1]);
    });
    console.log('data to send', data);
    createComent(data, handleResponse);
  };
  const handleResponse = (response) => {
    console.log('Created post response', response);
    // TODO: manage flash message
    navigate('/homeschooling/home', { replace: true });
  };

  return (
    <Page title="Detalles del Post | Learning Zone">
      {post && console.log('Ver1 post.author', post.author)}
      {post && console.log('Ver2 post.author', post)}
      {post && (
        <Container>
          <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" align="center" gutterBottom>
              {post.title}
            </Typography>
          </Stack>
          <Card sx={{ position: 'relative' }}>
            <CardMediaStyle
              sx={{
                pt: 'calc(100% * 1 / 2)',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute'
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
              {post.author && (
                <AvatarStyle
                  alt={post.author.name}
                  src={post.author.avatarUrl}
                  sx={{ top: 395, left: 20, width: 40, height: 40 }}
                />
              )}

              <ImageUrlImgStyle src={post.imageUrl} />
            </CardMediaStyle>

            <Box sx={{ p: 3, pb: 1 }} dir="ltr" style={{ marginBottom: 10 }}>
              {post.author && (
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  {fDate(post.createdAt)}
                </Typography>
              )}
              <Box
                component={Icon}
                icon={messageCircleFill}
                sx={{ width: 16, height: 16, mr: 0.5, color: 'text.disabled' }}
              />
              {post.author && (
                <Typography variant="caption" color="text.disabled">
                  {console.log('numer comments:', post)}
                  {fShortenNumber(post.comments.length)}
                </Typography>
              )}
              <Box
                component={Icon}
                icon={heartFill}
                sx={{ width: 16, height: 16, mr: 0.5, color: 'text.disabled' }}
              />
              <Typography variant="caption" color="text.disabled">
                {fShortenNumber(post.likeCounter)}
              </Typography>
              <Typography variant="body1">{post.content}</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <FormControl style={{ margin: 10, width: '98%' }}>
                <FormLabel htmlFor="comment">Comentario</FormLabel>
                <TextField
                  name="comment"
                  defaultValue={formValues.comment}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Agregar comentario
              </Button>
            </form>
          </Card>
          {comments && (
            <Grid container spacing={1} sx={{ pb: 10, p: 1 }}>
              {console.log('Ver2 comments.author', comments)}
              {comments.length === 0 && (
                <Box sx={{ marginLeft: 1 }}>Sin mensajes para mostrar.</Box>
              )}
              {comments.length > 0 &&
                comments.map((comment) => (
                  <Grid key={comment.id} item xs={10} sm={50} md={20}>
                    <Card sx={{ position: 'relative' }}>
                      <CardContent>
                        <Typography variant="subtitle2" noWrap>
                          {comment.user.fullName}: {comment.comment}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </Container>
      )}
    </Page>
  );
}
