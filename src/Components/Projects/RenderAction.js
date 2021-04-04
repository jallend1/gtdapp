import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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
  const [showDetails, setShowDetails] = useState(false);

  const calculateDate = () => {
    const date = new Date(project.createdAt);
    return date.toDateString();
  }

  const handleShowDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  }

  return (
    <li
      data-id={project.id}
      data-step={action.step}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="action-li"
      
    >
      <div className="action-content">
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
          <div className="subtitle" onClick={handleShowDetails}>
            {showDetails ? 'See Less' : 'See More'}
          </div>
        </div>
      </div>
      {showDetails ? (
        <div id="details" className="details">
        {/* If no project info is passed, it means it's on the project page itself, so doesn't display link to it */}
          <div>
            Added: {calculateDate()}
          </div>
          {needsURL ? (
            <>
              <div>
                From: <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </div>
              <div>
                Remaining Tasks: {project.nextActions.filter(project => project.isComplete === false).length}
              </div>
              <div>
                Total Tasks: {project.nextActions.length}
              </div>
            </>
          ) : null}
        </div>
        ) : null
      }
    </li>
  );
};

export default RenderAction;
