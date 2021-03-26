import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

const RenderAction = ({
  action,
  project,
  needsURL,
  handleDragOver,
  handleDragStart,
  handleDrop,
}) => {
  const { completeAction, deleteAction } = useContext(ProjectContext);

  return (
    <li
      data-id={project.id}
      data-step={action.step}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="action">
        <div
          className="material-icons trash"
          data-id={project.id}
          data-step={action.step}
          onClick={deleteAction}
        >
          delete_outline
        </div>
        <div
          onClick={completeAction}
          data-id={project.id}
          data-step={action.step}
          className={action.isComplete ? "action-complete" : null}
        >
          {action.action}
        </div>
        {/* If no project info is passed, it means it's on the project page itself, so doesn't display link to it */}
      </div>
        {needsURL ? (
          <div className="subtitle">
            From: <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </div>
        ) : null}
    </li>
  );
};

export default RenderAction;
