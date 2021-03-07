import { Link } from "react-router-dom";

const RenderAction = ({ action, project, completeAction, needsURL }) => {
  return (
    <div className="action">
      <div className="material-icons">delete_outline</div>
      <li>
        <div
          onClick={completeAction}
          data-id={project.id}
          data-step={action.step}
          className={action.isComplete ? "action-complete" : null}
        >
          {action.action}
        </div>
        {/* If no project info is passed, it means it's on the project page itself, so doesn't display link to it */}
        {needsURL ? (
          <div className="subtitle">
            From: <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </div>
        ) : null}
      </li>
    </div>
  );
};

export default RenderAction;
