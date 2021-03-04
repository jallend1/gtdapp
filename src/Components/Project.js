const Project = (props) => {
  if (props.projects.length > 0) {
    const id = parseInt(props.match.params.id);
    const project = props.projects.filter((project) => project.id === id)[0];
    const createdAt = new Date();
    return (
      <div className="container">
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
      </div>
    );
  } else {
    return <h3>Loading</h3>;
  }
};

export default Project;
