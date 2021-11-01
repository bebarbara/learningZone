import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography, Tabs, Tab, Box } from '@material-ui/core';
// components
import Page from '../components/Page';
import { MyPostsList, PostsList, Users } from '../components/_dashboard/home';
//
// ----------------------------------------------------------------------

const getPostsFollowed = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/posts')
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
const getMyPosts = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/users/1/posts')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Posts3 response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });

export default function Home() {
  const [tabValue, setTabValue] = useState('one');
  const [postsFollowed, setPostsFollowed] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    console.log('useEffect', postsFollowed);
    getPostsFollowed(handlePostsFollowed);
  }, []);

  const handlePostsFollowed = (response) => {
    console.log('set PostsFollowed', response);
    setPostsFollowed(response.posts);
  };
  const handleAllPosts = (response) => {
    console.log('set All Posts', response);
    setAllPosts([]);
  };
  const handleMyPosts = (response) => {
    console.log('set My Posts', response);
    setMyPosts([]);
  };
  const handleTabChange = (post, newValue) => {
    if (newValue === 'one') {
      getPostsFollowed(handlePostsFollowed);
    }
    if (newValue === 'two') {
      getAllPosts(handleAllPosts);
    }
    if (newValue === 'three') {
      getMyPosts(handleMyPosts);
    }
    if (newValue === 'four') {
      getMyPosts(handleMyPosts);
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
            Nuevo Post
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de posts">
                <Tab value="one" label="Post de mis seguidos" />
                <Tab value="two" label="Post de la comunidad" />
                <Tab value="three" label="Mis post" />
                <Tab value="four" label="Usuarios" />
              </Tabs>
            </Box>
            {tabValue === 'one' && <PostsList posts={postsFollowed} wxs={12} wmd={6} />}
            {tabValue === 'two' && <PostsList posts={allPosts} wxs={12} wmd={4} />}
            {tabValue === 'three' && <MyPostsList posts={myPosts} wxs={12} wmd={4} />}
            {tabValue === 'four' && <Users posts={myPosts} wxs={12} wmd={4} />}
          </Box>
        </Stack>
      </Container>
    </Page>
  );
}
