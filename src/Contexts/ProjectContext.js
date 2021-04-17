import React, { createContext } from "react";
import { db } from "../firebaseConfig";
import { AuthContext } from "./AuthContext";

export const ProjectContext = createContext();
class ProjectContextProvider extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }




  addAction = (e, projectId) => {
    e.preventDefault();
    const incomingAction = e.target[0].value; // Extracts value from incoming input field
    const projects = this.state.projects.slice();
    const currentProject = projects.find((project) => project.id === projectId);
    currentProject.nextActions.forEach(
      (action, index) => (action.step = index)
    );
    const newAction = {
      action: incomingAction,
      isComplete: false,
      step: currentProject.nextActions.length,
    };
    const updatedActions = [...currentProject.nextActions, newAction];
    db.collection("projects").doc(projectId).update({
      nextActions: updatedActions,
    });
  };
  completeAction = (e) => {
    const projectsCopy = this.state.projects.slice();
    // Extracts step number and project ID from DIV
    const actionStep = parseInt(e.target.dataset.step);
    const targetProjectId = e.target.dataset.id;
    // Locates specified Project
    const targetProject = projectsCopy.find(
      (project) => project.id === targetProjectId
    );
    // Takes nextActions and locates the one to change
    const nextActions = targetProject.nextActions;
    const targetAction = targetProject.nextActions.find(
      (action) => action.step === actionStep
    );
    // Flips it to complete and updates Firebase
    targetAction.isComplete = !targetAction.isComplete;
    db.collection("projects").doc(targetProjectId).update({
      nextActions: nextActions,
    });
  };

  deleteAction = (e, entireProject = false) => {
    // Extracts ID and action step number from target div
    const { id } = e.target.dataset;
    const updatedProjects = this.state.projects.slice();
    // Retrieves associated project and individual action
    const project = updatedProjects.find((project) => project.id === id);
    if (entireProject) {
      db.collection("projects").doc(id).delete();
    } else {
      const { step } = e.target.dataset;
      const action = project.nextActions.findIndex(
        (action) => action.step === parseInt(step)
      );
      // Removes targeted action
      project.nextActions.splice(action, 1);
      db.collection("projects")
        .doc(id)
        .update({ nextActions: project.nextActions });
    }
  };
  fetchProjects = () => {
    db.collection("projects").onSnapshot((snapShot) => {
      const fetchedProjects = [];
      snapShot.forEach((project) => {
        fetchedProjects.push(project.data());
      });
      this.setState({ projects: fetchedProjects });
    });
  };

  toggleArchive = (e) => {
    const projectID = e.target.dataset.id;
    const project = this.state.projects.find(
      (project) => project.id === projectID
    );
    const archived = !project.archived;
    db.collection("projects").doc(projectID).update({ archived: archived });
  };

  toggleStar = (e) => {
    const projectID = e.target.dataset.id;
    const project = this.state.projects.find(
      (project) => project.id === projectID
    );
    const starred = !project.starred;
    db.collection("projects").doc(projectID).update({ starred: starred });
  };

  componentDidMount() {
    // TODO: Playing with this as a strategy on whether or not to fetch projects? Maybe wait until projects tied to user ID to proceed
    // const isLoggedIn = this.context.isLoggedIn;
    // this.setState({isLoggedIn});    
    this.fetchProjects();
  }
  
  render() {
    return (
      <ProjectContext.Provider
        value={{
          projects: [...this.state.projects],
          addAction: this.addAction,
          completeAction: this.completeAction,
          deleteAction: this.deleteAction,
          toggleArchive: this.toggleArchive,
          toggleStar: this.toggleStar,
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
