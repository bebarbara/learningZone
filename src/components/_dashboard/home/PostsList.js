import PropTypes from 'prop-types';
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

export default function PostsList({ posts, wxs, wmd, ...other }) {
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
