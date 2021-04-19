import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import Project from "./Project";
import NoProjects from './NoProjects';

const ProjectList = (props) => {
  const { projects } = useContext(ProjectContext);
  const renderProjects = () => {
    let projectsToShow;
    if (props.match.path === "/archive") {
      projectsToShow = projects.filter((project) => project.archived);
    } else if (props.match.path === "/active") {
      projectsToShow = projects.filter((project) => !project.archived);
    } else {
      projectsToShow = projects.slice();
    }
    return projectsToShow.map((project) => {
      return <Project id={project.id} projects={projects} key={project.id} />;
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
        <main>{projects.length === 0 ? <NoProjects /> : renderProjects()}</main>
    </div>
  );
};

export default ProjectList;
