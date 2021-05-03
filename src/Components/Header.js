import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';

const Header = () => {
  const { user } = useContext(AuthContext);
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            GTDApp
          </Typography>
          {user ? (
            <div>
              <Avatar src={user.photoURL} />
            </div>
          ) : (
            <Button color="secondary">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
