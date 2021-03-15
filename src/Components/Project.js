import RenderAction from "./RenderAction";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";

const Project = (props) => {
  const doesItWork = useContext("projects");
  console.log(doesItWork);
  // If id property comes back from Params, uses that, otherwise takes the id passed in
  const id = useParams().id || props.id;
  // If projects are loaded, but none match ID, throw an error
  if (props.projects && !props.projects.find((project) => project.id === id)) {
    return <h3>Sorry, we weren't able to find that project.</h3>;
  }
  // If projects are loaded, displays it
  else if (props.projects) {
    const project = props.projects.find((project) => project.id === id);
    const createdAt = new Date();
    return (
      <div className="container">
        <div className="project" key={project.id}>
          <div className="project-head">
            <span className="material-icons">star_border</span>
            {/* Displays header as link to project page IF not _on_ project page currently */}
            {props.match ? (
              <h3>{project.title}</h3>
            ) : (
              <Link to={`/projects/${project.id}`}>
                <h3>{project.title} </h3>
              </Link>
            )}
            <div>
              <span className="material-icons">delete_outline</span>
            </div>
          </div>
          <div className="project-body">
            <ol>
              {project.nextActions.map((action) => (
                <RenderAction
                  action={action}
                  key={project.id + action.step}
                  project={project}
                  completeAction={props.completeAction}
                  needsURL={false}
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
