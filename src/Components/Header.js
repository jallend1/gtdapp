import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useHistory } from 'react-router';

const Header = ({ drawerWidth }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
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
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          GTDApp
        </Typography>
        {user ? (
          <Button onClick={() => history.push('/profile')}>
            <Avatar src={user.photoURL} />
          </Button>
        ) : (
          <Button color="secondary" onClick={() => history.push('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
