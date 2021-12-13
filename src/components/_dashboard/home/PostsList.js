import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash';
// material
import { Grid, Stack, Box } from '@material-ui/core';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '.';

// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: 'latest', label: 'Reciente' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Antiguo' }
];

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_posts) => _posts.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PostsList({ posts, wxs, wmd, ...other }) {
  // console.log('barbara post 1 28-11 ', posts);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const filteredPosts = applySortFilter(allPosts, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredPosts.length === 0;

  return (
    <Box sx={{ width: '100%' }} m={3}>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
        <BlogPostsSearch posts={posts} />
        <BlogPostsSort options={SORT_OPTIONS} />
      </Stack>
      <Grid container spacing={3} {...other}>
        {posts.length === 0 && (
          <Box sx={{ marginLeft: 5 }}>En estos momentos no hay publicaciones para mostrar.</Box>
        )}
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid key={post.id} item xs={wxs} sm={5} md={wmd}>
              <BlogPostCard post={post} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
