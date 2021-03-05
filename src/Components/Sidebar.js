import { Link } from "react-router-dom";
const Sidebar = ({projects}) => {
  return (
    <div>
      <h2>Projects Sidebar</h2>
      <Link to="/projects/new">
        <h3>
          <span className="material-icons">add_task</span> Add a New Project
        </h3>
      </Link>
      <div>
        <h4>Active Projects</h4>
        <div>
          <ul>
            {projects && projects.map(project => <li key={project.id}>{project.title}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
