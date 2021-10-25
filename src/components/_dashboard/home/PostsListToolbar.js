import * as React from 'react';
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Seguidos" {...a11yProps(0)} />
          <Tab label="Comunidad" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
      <TabPanel value={value} index={1}>
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
      <TabPanel value={value} index={2}>
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
