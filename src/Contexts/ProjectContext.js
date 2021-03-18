import React, { createContext } from "react";
import { db } from "../firebaseConfig";

export const ProjectContext = createContext();

class ProjectContextProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projects: []
    }
  }
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
      // this.setState({projects: projectsCopy});
      db.collection("projects").doc(targetProjectId).update({
        nextActions: nextActions,
      });
    };

    fetchProjects = () => {
      db.collection("projects").onSnapshot((snapShot) => {
        const fetchedProjects = [];
        snapShot.forEach((project) => {
          fetchedProjects.push(project.data());
        });
        this.setState({projects: fetchedProjects})
      });
    };

    componentDidMount(){
      this.fetchProjects();
    }
  render(){
    return(
      <ProjectContext.Provider value={{projects:[...this.state.projects], completeAction: this.completeAction }}>
          {this.props.children}
      </ProjectContext.Provider>
  )
  }

}
export default ProjectContextProvider;
