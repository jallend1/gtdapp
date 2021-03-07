import RenderAction from "./RenderAction";

const Project = (props) => {
  // If no ID passed, means Component is being loaded from URL and takes ID from that
  const id = props.id || parseFloat(props.match.params.id);
  // If projects are loaded, but none match ID, throw an error
  if (props.projects && !props.projects.find((project) => project.id === id)) {
    return <h3>Sorry, we weren't able to find that project.</h3>;
  } else if (props.projects) {
    const project = props.projects.find((project) => project.id === id);
    const createdAt = new Date();
    return (
      <div className="container">
        <div className="project" key={project.id}>
          <div className="project-head">
            <span className="material-icons">star_border</span>
            <h3>{project.title} </h3>
            <div>
              <span className="material-icons">delete_outline</span>
            </div>
          </div>
          <div className="project-body">
            <ol>
              {project.nextActions.map((action) => (
                <RenderAction
                  action={action}
                  key={project.id + action.step * 0.1}
                  project = {project}
                  completeAction = {props.completeAction}
                />
              ))}
            </ol>
          </div>
          <div className="project-footer">
            <span className="material-icons">archive</span>
            <p>Created at: {createdAt.toDateString()}</p>
            <p>Posted by userID: {project.userId}</p>
          </div>
        </div>
      </div>
    );
  }
  // Loading screen while projects are retrieved
  else {
    return <h3>Loading...</h3>;
  }
};

export default Project;
