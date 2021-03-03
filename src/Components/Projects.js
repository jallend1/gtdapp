import { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

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

  useEffect(() => getProjects(), []);

  return (
    <div className="container">
      <header>
        <h2>Project List</h2>
      </header>
      <main>{renderProjects()}</main>
    </div>
  );
};

export default Projects;
