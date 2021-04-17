import { Switch, Route } from "react-router-dom";
import { useContext } from 'react';

import ProjectContextProvider from "./Contexts/ProjectContext";
import { AuthContext } from "./Contexts/AuthContext";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import NextActions from "./Components/Projects/NextActions";
import SideBar from "./Components/Sidebar";
import Project from "./Components/Projects/Project";
import ProjectList from "./Components/Projects/ProjectList";
import NewProject from "./Components/Projects/NewProject";
import About from "./Components/About";
import Error from "./Components/Error";
import Footer from "./Components/Footer";
import Login from "./Components/Auth/Login";

function App() {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <div className="App">
        <NavBar />
        <Header />
        {isLoggedIn ? (        
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
              <Route path="/signup" render={(props) => <Login {...props} />} />
              <Route path="/login" render={(props) => <Login {...props} />} />
              <Route exact path="/">
                <NextActions /> 
              </Route>
              <Route path="/">
                <Error />
              </Route>
            </Switch>
          </div>
        </ProjectContextProvider>
        ) : <Login />}
        <Footer />
    </div>
  )
}

export default App;
