import { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
    const [projects, setProjects] = useState(null);
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
    // fetchProjects();
  return(
      <ProjectContext.Provider value={projects}>
          {props.children}
      </ProjectContext.Provider>
  )
}

export default ProjectContextProvider;
