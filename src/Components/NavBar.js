import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import {
  HomeOutlined,
  SubjectOutlined,
  ArchiveOutlined,
  InfoOutlined,
} from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const NavBar = () => {
  const { isLoggedIn, signOut, user } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => {
    return {
      navbar: {
        display: "flex",
      },
    };
  });

  const classes = useStyles();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Projects",
      icon: <SubjectOutlined color="secondary" />,
      path: "/projects",
    },
    {
      text: "Active",
      path: "/active",
    },
    {
      text: "Archive",
      icon: <ArchiveOutlined color="secondary" />,
      path: "/archive",
    },
    {
      text: "About",
      icon: <InfoOutlined color="secondary" />,
      path: "/about",
    },
  ];

  const noUser = () => {
    return (
      <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Create Account</NavLink>
        </li>
      </>
    );
  };

  const userDetails = () => {
    return (
      <>
        <li className="userDetails" onClick={signOut}>
          Sign out
        </li>
        <li className="userDetails">
          <NavLink to="/profile">
            {user.photoURL ? (
              <img src={user.photoURL} alt="profile" className="profile-pic" />
            ) : user.displayName ? (
              user.displayName
            ) : (
              user.email
            )}
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <>
      <nav>
        <List className={classes.navbar}>
          {menuItems.map((item) => (
            <ListItem button key={item.text}>
              <NavLink exact to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </NavLink>
            </ListItem>
          ))}
        </List>
        <ul>{isLoggedIn ? userDetails() : noUser()}</ul>
      </nav>
    </>
  );
};

export default NavBar;
