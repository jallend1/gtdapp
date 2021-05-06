import Header from "./Header";
import MenuBar from "./MenuBar";

import { makeStyles } from "@material-ui/core";
const Layout = ({ children }) => {
  const drawerWidth = 200;
  
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
      },
      page: {
        flexGrow: 1,
        marginLeft: drawerWidth,
      }
    };
  });
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header drawerWidth={drawerWidth} />
        <MenuBar drawerWidth={drawerWidth} />
      </div>
      <div className={classes.page}>{children}</div>
    </>
  );
};

export default Layout;
