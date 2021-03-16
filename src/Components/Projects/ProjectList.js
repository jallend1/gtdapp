import { Link } from "react-router-dom";
import { useContext } from "react";
import {ProjectContext} from "../../Contexts/ProjectContext";
import Project from "./Project";

const ProjectList = () => {
  const projects = useContext(ProjectContext);
  const renderProjects = () => {
    return projects.map((project) => {
      return (
        <Project
          id={project.id}
          projects={projects}
          key={project.id}
        />
      );
    });
  };
  return (
    <div className="container">
      <header id="projectList" className="space-around">
        <h2>Project List</h2>
        <Link to="/projects/new">
          <h2>
            <span className="material-icons">add_task</span> Add New Project
          </h2>
        </Link>
      </header>
      <main>{projects && renderProjects()}</main>
    </div>
  );
};

export default ProjectList;
