import { Link } from "react-router-dom";
import Project from './Project';

const ProjectList = ({ projects }) => {
  const renderProjects = () => {
    return projects.map((project) => {
       return <Project id={project.id} projects={projects} key={project.id} />
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
