import MaterialAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Button, Switch } from '@material-ui/core';
import { useStoreActions } from '../store/store';
import { drawerWidth } from '../themes';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import { LOGIN } from '../router/routes';
import { useTheme } from '../hooks/useTheme';

const AppBar: React.FC = () => {
  const history = useHistory();
  const setTheme = useStoreActions((actions) => actions.theme.setTheme);
  const toggleDrawer = useStoreActions(
    (actions) => actions.layout.toggleDrawer,
  );
  const theme = useTheme();

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
          <Switch onChange={handleThemeToggle} />

          <Button color="primary" onClick={() => history.push(LOGIN)}>
            Sign up
          </Button>

          <Button color="primary" onClick={() => history.push(LOGIN)}>
            Sign in
          </Button>
        </Toolbar>
      </MaterialAppBar>
    </div>
  );
};
export default AppBar;
