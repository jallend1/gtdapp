import { Link } from "react-router-dom";
import { useContext } from "react";

import {ProjectContext} from "../Contexts/ProjectContext";
const Sidebar = () => {
  const projects = useContext(ProjectContext);
  return (
    <div>
      <h2>Projects Sidebar</h2>
      <Link to="/projects/new">
        <h3>
          <span className="material-icons">add_task</span> Add a New Project
        </h3>
      </Link>
      <div className="sidebar-list">
        <h4>Active Projects</h4>
        <div>
          <ul>
            {projects &&
              projects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                  <li>{project.title}</li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
