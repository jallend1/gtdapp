import Header from "./Header";
import MenuBar from "./MenuBar";

import { makeStyles } from "@material-ui/core";
const Layout = ({ children }) => {
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
      },
    };
  });
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header />
        <MenuBar />
      </div>
      <div className>{children}</div>
    </>
  );
};

export default Layout;
