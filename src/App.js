// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import useCurrentUser from './utils/useCurrentUser';
import Login from './pages/Login';

// ----------------------------------------------------------------------

export default function App() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  return (
    <ThemeConfig>
      <ScrollToTop />
      {currentUser && <Router />}
      {!currentUser && <Login setCurrentUser={setCurrentUser} />}
    </ThemeConfig>
  );
}
