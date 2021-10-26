import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  BlogPostCard,
  BlogPostsSort,
  BlogPostsSearch,
  ProfileListToolbar
} from '../components/_dashboard/profile';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Popular' },
  { value: 'popular', label: 'Reciente' },
  { value: 'oldest', label: 'Antiguo' }
];

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Page title="Profile | Learning-Zone">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mi perfil
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <ProfileListToolbar key="lista-profile" />
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}