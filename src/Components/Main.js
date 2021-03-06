import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProjectContextProvider from "../Contexts/ProjectContext";
import { AuthContext } from "../Contexts/AuthContext";

import NextActions from "./Projects/NextActions";
import SideBar from "./Sidebar";
import Project from "./Projects/Project";
import ProjectList from "./Projects/ProjectList";
import NewProject from "./Projects/NewProject";
import About from "./About";
import Error from "./Error";
import Login from "./Auth/Login";
import Profile from "./Profile";
import Message from "./Message";

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <ProjectContextProvider>
      <div className="main container">
        <SideBar />
        <Switch>
          <Route path="/projects/new">
            <NewProject />
          </Route>
          <Route
            path="/projects/:id"
            render={(props) => <Project {...props} />}
          />
          <Route
            path="/projects"
            render={(props) => <ProjectList {...props} />}
          />
          <Route
            path="/archive"
            render={(props) => <ProjectList {...props} />}
          />
          <Route
            path="/active"
            render={(props) => <ProjectList {...props} />}
          />
          <Route path="/about">
            <About />
          </Route>
          <Route
            path="/signup"
            render={(props) =>
              isLoggedIn ? <Redirect to="/profile" /> : <Login {...props} />
            }
          />
          <Route
            path="/login"
            render={(props) =>
              isLoggedIn ? <Redirect to="/profile" /> : <Login {...props} />
            }
          />
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <NextActions />
          </Route>
          <Route path="/">
            <Error />
          </Route>
        </Switch>
        <Message />
      </div>
    </ProjectContextProvider>
  );
};

export default Main;
