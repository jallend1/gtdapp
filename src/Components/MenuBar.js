import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import {
  HomeOutlined,
  SubjectOutlined,
  ArchiveOutlined,
  InfoOutlined,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const MenuBar = () => {
  // TODO: drawerWidth is stubbornly refusing to change
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
    },
  }));

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

  const classes = useStyles();

  return (
    <Drawer variant="permanent" anchor="left" className={classes.drawer}>
      <List>
        {menuItems.map((item) => (
          <NavLink to={item.path} key={item.text}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default MenuBar;
