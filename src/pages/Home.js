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
  PostsListToolbar
} from '../components/_dashboard/home';
//
import POSTS from '../_mocks_/home';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Reciente' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Antiguo' }
];

// ----------------------------------------------------------------------

export default function Home() {
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <PostsListToolbar key="lista-posts" />
        </Stack>
      </Container>
    </Page>
  );
}
