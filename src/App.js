import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { db } from './firebaseConfig';

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
  const fetchProjects = () => {
    const fetchedProjects = [];
    db.collection('projects').onSnapshot(snapShot => {
      snapShot.forEach(project => {
        fetchedProjects.push(project.data())
        fetchedProjects[fetchedProjects.length - 1].id = project.id;
      });
      setProjects(fetchedProjects);
    });
  }

  const addProject = (project) => {
    const currentProjects = projects.slice();
    currentProjects.push(project);
    setProjects(currentProjects);
  };

  const completeAction = (e) => {
    const projectsCopy = projects.slice();
    // Extracts step number and project ID from DIV
    const actionStep = parseFloat(e.target.dataset.step);
    const targetProjectId = parseFloat(e.target.dataset.id);
    // Locates specified Project and its corresponding action
    const targetProject = projectsCopy.find(
      (project) => project.id === targetProjectId
    );
    const targetAction = targetProject.nextActions.find(
      (action) => action.step === actionStep
    );
    targetAction.isComplete = !targetAction.isComplete;
    setProjects(projectsCopy);
  };

  useEffect(() => fetchProjects(), []);

  return (
    <div className="App">
      <NavBar />
      <Header />
      <Switch>
        <Route path="/projects/new">
          <NewProject addProject={addProject} projects={projects} />
        </Route>
        <Route
          path="/projects/:id"
          render={(props) => (
            <Project
              {...props}
              projects={projects}
              completeAction={completeAction}
            />
          )}
        />
        <Route path="/projects">
          <ProjectList
            projects={
              projects && projects.filter((project) => !project.archived)
            }
            completeAction={completeAction}
          />
        </Route>
        <Route path="/archive">
          <ProjectList
            projects={
              projects && projects.filter((project) => project.archived)
            }
            completeAction={completeAction}
          />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Main projects={projects} completeAction={completeAction} />
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
