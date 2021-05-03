import { Drawer, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { HomeOutlined, SubjectOutlined, ArchiveOutlined, InfoOutlined } from '@material-ui/icons'

const MenuBar = () => {
    // TODO: drawerWidth is stubbornly refusing to change
    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
       drawer: {
           width: drawerWidth,
           flexShrink: 0
       } 
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

      const classes = useStyles()
      
    return (
        <div className={classes.root}>
        <Drawer variant="permanent" anchor="left" className={classes.drawer}>
            {menuItems.map(item => (
                <ListItem button key={item.text}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </Drawer>
        </div>
    )
}

export default MenuBar;