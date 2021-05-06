import React, { createContext } from "react";
import { Redirect } from "react-router-dom";
import { db } from "../firebaseConfig";
import { AuthContext } from "./AuthContext";

export const ProjectContext = createContext();
class ProjectContextProvider extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      messageDetails: { type: "none", message: "" },
    };
  }

  componentDidMount() {
    // Store project snapshot listener
    this.projectListener = this.fetchProjects();
  }

  componentWillUnmount() {
    // Detaches project snapshot listener after authentication change
    this.projectListener && this.projectListener();
    this.projectListener = undefined;
  }

  addAction = (e, projectId) => {
    e.preventDefault();
    const incomingAction = e.target[0].value.trim(); // Extracts value from incoming input field
    if (incomingAction.length === 0) {
      return <Redirect to="/" />;
    } else {
      const projects = this.state.projects.slice();
      const currentProject = projects.find(
        (project) => project.id === projectId
      );
      currentProject.nextActions.forEach(
        (action, index) => (action.step = index)
      );
      const newAction = {
        action: incomingAction,
        isComplete: false,
        step: currentProject.nextActions.length,
      };
      const updatedActions = [...currentProject.nextActions, newAction];
      db.collection("projects")
        .doc(this.context.user.uid)
        .collection("projects")
        .doc(projectId)
        .update({
          nextActions: updatedActions,
        });
    }
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
    db.collection("projects")
      .doc(this.context.user.uid)
      .collection("projects")
      .doc(targetProjectId)
      .update({
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
      db.collection("projects")
        .doc(this.context.user.uid)
        .collection("projects")
        .doc(id)
        .delete();
      this.updateMessage({
        type: "delete",
        message: "Project has been deleted",
      });
    } else {
      const { step } = e.target.dataset;
      const action = project.nextActions.findIndex(
        (action) => action.step === parseInt(step)
      );
      // Removes targeted action
      project.nextActions.splice(action, 1);
      db.collection("projects")
        .doc(this.context.user.uid)
        .collection("projects")
        .doc(id)
        .update({ nextActions: project.nextActions });
      this.updateMessage({
        type: "delete",
        message: "Action has been deleted",
      });
    }
  };
  fetchProjects = () => {
    return db
      .collection("projects")
      .doc(this.context.user.uid)
      .collection("projects")
      .onSnapshot((snapShot) => {
        const fetchedProjects = [];
        snapShot.forEach((project) => {
          fetchedProjects.push(project.data());
        });
        this.setState({ projects: fetchedProjects });
      });
  };

  toggleArchive = (e, incomingID) => {
    // TODO: Maybe remove the event parameter? Ensure all instances of toggle archive can pass in project ID
    const projectID = e.target.dataset.id || incomingID;
    const project = this.state.projects.find(
      (project) => project.id === projectID
    );
    const archived = !project.archived;
    db.collection("projects")
      .doc(this.context.user.uid)
      .collection("projects")
      .doc(projectID)
      .update({ archived: archived });
  };

  toggleStar = (e) => {
    const projectID = e.target.dataset.id;
    const project = this.state.projects.find(
      (project) => project.id === projectID
    );
    const starred = !project.starred;
    db.collection("projects")
      .doc(this.context.user.uid)
      .collection("projects")
      .doc(projectID)
      .update({ starred: starred });
  };

  updateMessage = (newMessage) => {
    this.setState({ messageDetails: newMessage });
    setTimeout(() => {
      this.setState({
        messageDetails: { type: "none", message: "" },
      });
    }, 3000);
  };

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
          messageDetails: this.state.messageDetails,
          updateMessage: this.updateMessage,
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
