import {
  Box,
  Drawer as MaterialDrawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { INDEX } from '../router/routes';
import { useStoreActions, useStoreState } from '../store/store';
import { drawerWidth } from '../themes';

const Drawer = () => {
  const history = useHistory();
  const drawerOpen = useStoreState((state) => state.layout.drawerOpened);
  const toggleDrawer = useStoreActions(
    (actions) => actions.layout.toggleDrawer,
  );

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button onClick={() => history.push(INDEX)}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <MaterialDrawer
        color="primary"
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ style: { border: 'none' } }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </MaterialDrawer>
      <MaterialDrawer
        variant="permanent"
        PaperProps={{ style: { border: 'none' } }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </MaterialDrawer>
    </Box>
  );
};
export default Drawer;
