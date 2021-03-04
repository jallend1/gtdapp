import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div>
      <h2>Projects Sidebar</h2>
      <Link to="/projects/new"><h3><span className="material-icons">add_task</span> Add a New Project</h3></Link>
    </div>
  );
};

export default Sidebar;
