import PropTypes from 'prop-types';
// material
import { Grid, Stack, Box } from '@material-ui/core';
import { BlogMyPostCard, BlogPostsSort, BlogPostsSearch } from '.';

// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: 'latest', label: 'Reciente' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Antiguo' }
];

MyPostsList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default function MyPostsList({ posts, wxs, wmd, ...other }) {
  console.log('barbara', posts);
  return (
    <Box sx={{ width: '100%' }} m={3}>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
        <BlogPostsSearch posts={posts} />
        <BlogPostsSort options={SORT_OPTIONS} />
      </Stack>
      <Grid container spacing={3} {...other}>
        {posts.length === 0 && (
          <Box sx={{ marginLeft: 5 }}>
            Aun no has subido ninguna publicación. Empieza a compartir tu experiencia con otros.
          </Box>
        )}
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid key={post.id} item xs={wxs} sm={5} md={wmd}>
              <BlogMyPostCard post={post} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
