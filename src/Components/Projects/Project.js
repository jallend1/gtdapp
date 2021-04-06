import RenderAction from "./RenderAction";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import AddActionForm from "./AddActionForm";
import { db } from "../../firebaseConfig";

import ProjectHeader from "./ProjectHeader";

const Project = (props) => {
  const { projects, toggleArchive } = useContext(ProjectContext);
  // If id property comes back from Params, uses that, otherwise takes the id passed in
  const id = useParams().id || props.id;
  // If projects are loaded, but none match ID, throw an error
  if (projects.length > 0 && !projects.find((project) => project.id === id)) {
    return <h3>Sorry, we weren't able to find that project.</h3>;
  }
  // If projects are loaded, displays it
  else if (projects.length > 0) {
    const project = projects.find((project) => project.id === id);
    const jsDate = new Date(project.createdAt).toUTCString();

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      e.dataTransfer.setData("step", e.target.dataset.step);
    };

    const handleDrop = (e) => {
      const movedTask = parseInt(e.dataTransfer.getData("step"));
      const nextActions = project.nextActions.slice();
      const targetAction = nextActions.find(
        (action) => parseInt(action.step) === movedTask
      );
      // Makes a deep copy of that object
      const newAction = JSON.parse(JSON.stringify(targetAction));
      // Adds a status field to distinguish it from the original one we need to delete
      newAction.wasJustMoved = true;
      // Inserts the new action into the array before the item it was dropped on
      nextActions.splice(e.target.dataset.step, 0, newAction);
      // Retrieves the index of the original one we need to remove and does so
      const toDelete = nextActions.findIndex(
        (action) =>
          !action.wasJustMoved === true && parseInt(action.step) === movedTask
      );
      nextActions.splice(toDelete, 1);
      // Maps over updated array to reorder the array to match the new order and reset attributes for further movement
      const newActionOrder = nextActions.map((action, index) => {
        action.wasJustMoved = false;
        action.step = index;
        return action;
      });
      //Sends new action order to Firebase
      db.collection("projects").doc(project.id).update({
        nextActions: newActionOrder,
      });
      e.dataTransfer.clearData();
    };

    const renderProjects = () => {
      return project.nextActions.map((action, index) => (
        <RenderAction
          action={action}
          key={index}
          project={project}
          isNextActionPage={false}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      ));
    };

    return (
      <div className="container">
        <div className="project" key={project.id}>
          <ProjectHeader project={project} match={props.match} />
          <div className="project-body">
            <ol>{renderProjects()}</ol>
            <AddActionForm projectId={project.id} />
          </div>
          <div className="project-footer">
            <span
              className="material-icons"
              data-id={project.id}
              onClick={toggleArchive}
            >
              {project.archived ? "unarchive" : "archive"}
            </span>
            <p>Created at: {jsDate}</p>
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
