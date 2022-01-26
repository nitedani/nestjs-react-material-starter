import MaterialAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Button, Switch } from '@mui/material';
import { useStoreActions } from '../store/store';
import { drawerWidth } from '../themes';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../router/routes';
import { useTheme } from '../hooks/useTheme';

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const setTheme = useStoreActions((actions) => actions.theme.setTheme);
  const toggleDrawer = useStoreActions(
    (actions) => actions.layout.toggleDrawer,
  );
  const [theme, themeEnum] = useTheme();

  const handleThemeToggle = (event: any) => {
    if (event.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div>
      <MaterialAppBar
        style={{
          backgroundImage: 'none',
          boxShadow: 'none',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            style={{ color: theme.palette.primary.contrastText }}
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Responsive drawer
          </Typography>
          <Switch onChange={handleThemeToggle} checked={themeEnum === 'dark'} />

          <Button color="primary" onClick={() => navigate(LOGIN)}>
            Sign up
          </Button>

          <Button color="primary" onClick={() => navigate(LOGIN)}>
            Sign in
          </Button>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
};
export default AppBar;
