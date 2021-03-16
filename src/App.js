import { Switch, Route } from "react-router-dom";

import ProjectContextProvider from './Contexts/ProjectContext';

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Project from "./Components/Projects/Project";
import ProjectList from "./Components/Projects/ProjectList";
import NewProject from "./Components/Projects/NewProject";
import About from "./Components/About";
import Error from "./Components/Error";
import Footer from "./Components/Footer";

function App() {

  const completeAction = (e) => {
    // const projectsCopy = projects.slice();
    // // Extracts step number and project ID from DIV
    // const actionStep = parseInt(e.target.dataset.step);
    // const targetProjectId = e.target.dataset.id;
    // // Locates specified Project
    // const targetProject = projectsCopy.find(
    //   (project) => project.id === targetProjectId
    // );
    // // Takes nextActions and locates the one to change
    // const nextActions = targetProject.nextActions;
    // const targetAction = targetProject.nextActions.find(
    //   (action) => action.step === actionStep
    // );
    // // Flips it to complete and updates Firebase
    // targetAction.isComplete = !targetAction.isComplete;
    // db.collection("projects").doc(targetProjectId).update({
    //   nextActions: nextActions,
    // });
  };

  return (
    <div className="App">
      <NavBar />
      <Header />
      <ProjectContextProvider>
        <Switch>
          <Route path="/projects/new">
            <NewProject />
          </Route>
          <Route
            path="/projects/:id"
            render={(props) => (
              <Project {...props} completeAction={completeAction} />
            )}
          />
          <Route path="/projects">
            <ProjectList completeAction={completeAction} />
          </Route>
          <Route path="/archive">
            <ProjectList completeAction={completeAction} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Main completeAction={completeAction} />
          </Route>
          <Route path="/">
            <Error />
          </Route>
        </Switch>
      </ProjectContextProvider>
      <Footer />
    </div>
  );
}

export default App;
