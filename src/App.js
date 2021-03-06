import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Project from "./Components/Project";
import ProjectList from "./Components/ProjectList";
import NewProject from "./Components/NewProject";
import About from "./Components/About";
import Error from "./Components/Error";
import Footer from "./Components/Footer";

function App() {
  const [projects, setProjects] = useState(null);
  const getProjects = () => {
    fetch("../data.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  const addProject = (project) => {
    const currentProjects = projects.slice();
    currentProjects.push(project);
    setProjects(currentProjects);
  }

  useEffect(() => getProjects(), []);

  return (
    <div className="App">
      <NavBar />
      <Header />
      <Switch>
        <Route path="/projects/new">
          <NewProject addProject = {addProject} projects={projects} />
        </Route>
        <Route
          path="/projects/:id"
          render={(props) => <Project {...props} projects={projects} />}
        />
        <Route path="/projects">
          <ProjectList
            projects={
              projects && projects.filter((project) => !project.archived)
            }
          />
        </Route>
        <Route path="/archive">
          <ProjectList
            projects={
              projects && projects.filter((project) => project.archived)
            }
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Main projects={projects} />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
