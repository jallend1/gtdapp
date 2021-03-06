import { useContext, useState } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

import ActionDetails from "./ActionDetails";

const RenderAction = ({
  action,
  project,
  isNextActionPage,
  starred,
  handleDragOver,
  handleDragStart,
  handleDrop,
}) => {
  const { completeAction, deleteAction } = useContext(ProjectContext);
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div
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
          {/* If the project is starred AND the starred variable exists, render a star 
            (Prevents it from starring each individual action on its own Project page)
           */}
          {starred ? <div className="material-icons">star</div> : null}
          <div className="subtitle" onClick={handleShowDetails}>
            {/* Only displays detail expansion on next actions page and not if on individual project page */}
            {isNextActionPage ? (showDetails ? "See Less" : "See More") : null}
          </div>
        </div>
      </div>
      {showDetails ? (
        isNextActionPage ? (
          <ActionDetails project={project} />
        ) : null
      ) : null}
      {/* If no project info is passed, it means it's on the project page itself, so no details to display on action*/}
    </div>
  );
};

export default RenderAction;
