import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

const RenderAction = ({ action, project, needsURL }) => {
  const { completeAction, deleteAction } = useContext(ProjectContext);
  return (
    <div className="action">
      <div
        className="material-icons"
        data-id={project.id}
        data-step={action.step}
        onClick={deleteAction}
      >
        delete_outline
      </div>
      <li>
        <div
          draggable="true"
          onClick={completeAction}
          onDragStart={() => console.log('Starting dragging!')}
          onDragEnd={() => console.log('Ending dragging!')}
          onDrop={() => console.log('DROPPED')}
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
