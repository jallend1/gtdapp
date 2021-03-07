import { Link } from "react-router-dom";

const RenderAction = ({ action, project, completeAction }) => {
  return (
    <div className="action">
      <div className="material-icons">delete_outline</div>
      <li>
        <div onClick = {completeAction} data-id={project.id} data-step={action.step} className= {action.isComplete ? 'action-complete' : null}>
          {action.action}
          {/* {action.isComplete ? (
            <input type="checkbox" checked />
          ) : (
            <input type="checkbox" />
          )} */}
        </div>
        {/* If no project info is passed, it means it's on the project page itself, so doesn't display link to it */}
        {project ? (
          <div className="subtitle">
            From: <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </div>
        ) : null}
      </li>
    </div>
  );
};

export default RenderAction;
