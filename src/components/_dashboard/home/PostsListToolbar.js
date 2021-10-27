import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// import Typography from '@mui/material/Typography';
import { Box, Typography, Tabs, Tab, Container, Stack, Button, Grid } from '@material-ui/core';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '.';
import POSTS from '../../../_mocks_/home';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Reciente' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Antiguo' }
];

const getPostsFollowed = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/posts')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });
const getAllPosts = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/posts')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });
const getMyPosts = (setPosts) =>
  fetch('https://learning-zone-poc.herokuapp.com/api/v1/posts')
    .then((response) => response.json())
    .then((json) => {
      console.log('LZ Events response json', json);
      setPosts(json);
    })
    .catch((error) => {
      console.error(error);
    });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [openFilter, setOpenFilter] = useState(false);
  const [tabValue, setTabValue] = useState('one');
  const [postsFollowed, setPostsFollowed] = useState([]);
  const [AllPosts, setAllPosts] = useState([]);
  const [MyPosts, setMyPosts] = useState([]);

  useEffect(() => {
    console.log('useEffect', postsFollowed);
    getPostsFollowed(handlePostsFollowed);
  }, []);

  const handlePostsFollowed = (response) => {
    console.log('set PostsFollowed', response);
    setPostsFollowed(response.postsFollowed);
  };
  const handleAllPosts = (response) => {
    console.log('set All Posts', response);
    setAllPosts(response.events);
  };
  const handleMyPosts = (response) => {
    console.log('set My Posts', response);
    setMyPosts(response.events);
  };

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 'one') {
      getPostsFollowed(handlePostsFollowed);
    }
    if (newValue === 'two') {
      getAllPosts(handleAllPosts);
    }
    if (newValue === 'three') {
      getMyPosts(handleMyPosts);
    }
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="tab de posts">
          <Tab value="one" label="Seguidos" />
          <Tab value="two" label="Comunidad" />
          <Tab value="three" label="Mis post" />
        </Tabs>
      </Box>
      <TabPanel tabValue="one">
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </TabPanel>
      <TabPanel tabValue="two">
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
        <Grid container spacing={3}>
          {console.log('postsFollowed?', postsFollowed)}
          {postsFollowed.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </TabPanel>
      <TabPanel tabValue="three">
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
}
