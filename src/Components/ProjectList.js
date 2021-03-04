import {Link} from 'react-router-dom';

const ProjectList = ({ projects }) => {
  const renderProjects = () => {
    return projects.map((project) => {
      const createdAt = new Date();
      return (
        <div className="project" key={project.id}>
          <div className="project-head">
            <h3>{project.title}</h3>
            <div>Star Icon Goes Here</div>
          </div>
          <div className="project-body">
            <p>{project.body}</p>
          </div>
          <div className="project-footer">
            <p>Created at: {createdAt.toDateString()}</p>
            <p>Posted by userID: {project.userId}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <header id="projectList" className="space-around">
        <h2>Project List</h2>
        <Link to="/projects/new">
        <h2><span className="material-icons">add_task</span> Add New Project</h2>
        </Link>
      </header>
      <main>{projects && renderProjects()}</main>
    </div>
  );
};

export default ProjectList;
