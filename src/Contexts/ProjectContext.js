import { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
    const [projects, setProjects] = useState(null);
    
    const completeAction = (e) => {
        const projectsCopy = projects.slice();
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
        setProjects(projectsCopy);
        db.collection("projects").doc(targetProjectId).update({
          nextActions: nextActions,
        });
      };

    const fetchProjects = () => {
      const fetchedProjects = [];
      db.collection("projects").onSnapshot((snapShot) => {
        snapShot.forEach((project) => {
          fetchedProjects.push(project.data());
        });
        setProjects(fetchedProjects);
      });
    };

    useEffect(() => fetchProjects(), []);
    
  return(
      <ProjectContext.Provider value={{projects, completeAction}}>
          {props.children}
      </ProjectContext.Provider>
  )
}

export default ProjectContextProvider;
