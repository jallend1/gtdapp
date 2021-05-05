import Header from "./Header";
import MenuBar from "./MenuBar";

import { makeStyles } from "@material-ui/core";
const Layout = ({ children }) => {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
      },
      page: {
        flexGrow: 1,
        marginLeft: drawerWidth,
      },
      toolbar: theme.mixins.toolbar,
    };
  });
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header />
        <MenuBar />
      </div>
      <div className={classes.page}>{children}</div>
    </>
  );
};

export default Layout;
