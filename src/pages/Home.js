import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography, Tabs, Tab, Box } from '@material-ui/core';
// components
import Page from '../components/Page';
import { MyPostsList, PostsList, Users } from '../components/_dashboard/home';
import useCurrentUser from '../utils/useCurrentUser';
//
// ----------------------------------------------------------------------
const prodUrl = 'https://learning-zone-poc.herokuapp.com';

const getPostsFollowed = (setPosts, id) =>
  fetch(`${prodUrl}/api/v1/users/${id}/posts?following=true`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts1 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });
const getAllPosts = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/posts')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts2 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });
const getMyPosts = (setPosts, userId) =>
  fetch(`${prodUrl}/api/v1/users/${userId}/posts`)
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts3 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });

export default function Home() {
  const { currentUser } = useCurrentUser();
  const [tabValue, setTabValue] = useState('one');
  const [postsFollowed, setPostsFollowed] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    console.log('useEffect', postsFollowed);
    getAllPosts(handleAllPosts);
  }, []);

  const handlePostsFollowed = (response) => {
    console.log('set PostsFollowed', response);
    setPostsFollowed(response.posts);
  };
  const handleAllPosts = (response) => {
    console.log('set All Posts', response);
    setAllPosts(response.posts);
  };
  const handleMyPosts = (response) => {
    console.log('set My Posts', response);
    setMyPosts(response.posts);
  };
  const handleTabChange = (post, newValue) => {
    if (newValue === 'one') {
      getAllPosts(handleAllPosts);
    }
    if (newValue === 'two') {
      getPostsFollowed(handlePostsFollowed, currentUser.id);
    }
    if (newValue === 'three') {
      getMyPosts(handleMyPosts, currentUser.id);
    }
    if (newValue === 'four') {
      getMyPosts(handleMyPosts, currentUser.id);
    }
    setTabValue(newValue);
  };

  return (
    <Page title="Home | Learning-Zone">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            ¡Bienvenido!
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/toassingtest"
            startIcon={<Icon icon={plusFill} />}
          >
            Nuevo publicación
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de posts">
                <Tab value="one" label="Comunidad" />
                <Tab value="two" label="Siguiendo" />
                <Tab value="three" label="Mis publicaciones" />
                <Tab value="four" label="Usuarios" />
              </Tabs>
            </Box>
            {tabValue === 'one' && <PostsList posts={allPosts} wxs={12} wmd={6} />}
            {tabValue === 'two' && <PostsList posts={postsFollowed} wxs={12} wmd={4} />}
            {tabValue === 'three' && <MyPostsList posts={myPosts} wxs={12} wmd={4} />}
            {tabValue === 'four' && <Users posts={myPosts} wxs={12} wmd={4} />}
          </Box>
        </Stack>
      </Container>
    </Page>
  );
}
