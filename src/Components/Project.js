const Project = (props) => {
  // If no ID passed, means Component is being loaded from URL and takes ID from that
  const id = props.id || parseInt(props.match.params.id);
  // If projects are loaded, but none match ID, throw an error
  if(props.projects && !props.projects.find(project => project.id === id)){
    return <h3>Sorry, we weren't able to find that project.</h3>
  }
  else if (props.projects) {
    const project = props.projects.find((project => project.id === id));
    const createdAt = new Date();
    return (
      <div className="container">
        <div className="project" key={project.id}>
          <div className="project-head">
            <h3>{project.title}</h3>
            <div>
              <span className="material-icons">
                star_border
              </span>
            </div>
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
  } 
  // Loading screen while projects are retrieved
  else {
    console.log('we are loading')
    return <h3>Loading...</h3>;
  }
};

export default Project;
