import { Switch, Route } from "react-router-dom";

import ProjectContextProvider from "./Contexts/ProjectContext";
import AuthContextProvider from './Contexts/AuthContext';

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Project from "./Components/Projects/Project";
import ProjectList from "./Components/Projects/ProjectList";
import NewProject from "./Components/Projects/NewProject";
import About from "./Components/About";
import Error from "./Components/Error";
import Footer from "./Components/Footer";
import SignUp from './Components/Auth/SignUp';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <NavBar />
      <Header />
      <ProjectContextProvider>
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
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/">
            <Error />
          </Route>
        </Switch>
      </ProjectContextProvider>
      <Footer />
      <SignUp />
      </AuthContextProvider>
    </div>
  );
}

export default App;
