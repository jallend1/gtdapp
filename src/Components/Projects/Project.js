import RenderAction from "./RenderAction";
import { Link, useParams, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import AddActionForm from "./AddActionForm";
import { db } from "../../firebaseConfig";

const Project = (props) => {
  const { projects, toggleArchive, toggleStar, deleteAction } = useContext(
    ProjectContext
  );
  const history = useHistory();
  const [movedTask, setMovedTask] = useState("{}");
  const [title, setTitle] = useState((''));

  // If id property comes back from Params, uses that, otherwise takes the id passed in
  const id = useParams().id || props.id;
  // If projects are loaded, but none match ID, throw an error
  if (projects && !projects.find((project) => project.id === id)) {
    return <h3>Sorry, we weren't able to find that project.</h3>;
  }
  // If projects are loaded, displays it
  else if (projects) {
    const project = projects.find((project) => project.id === id);
    const jsDate = new Date(project.createdAt).toUTCString();

    const archivedLogic = () => {
      return project.archived ? (
        <span
          className="material-icons"
          data-id={project.id}
          onClick={toggleArchive}
        >
          unarchive
        </span>
      ) : (
        <span
          className="material-icons"
          data-id={project.id}
          onClick={toggleArchive}
        >
          archive
        </span>
      );
    };

    const deleteProject = (e) => {
      deleteAction(e, true);
      history.push('/');
    }

    /* Displays header as link to project page IF not _on_ project page currently */
    const displayLink = () => {
      return props.match ? (
        <div className="project-title">
          <h3>{project.title}</h3>
          <span
          className="material-icons"
          onClick={editTitle}
        >
          edit
        </span>
        </div>
      ) : (
        <Link to={`/projects/${project.id}`}>
          <h3>{project.title} </h3>
        </Link>
      );
    };

    const editTitle = () => {
      const title = document.getElementsByClassName('project-title')[0];
      console.log(project.title)
      console.log(title)
      title.innerHTML = `
        <input type="textbox" value="${project.title}"/>
      `
    }

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      const taskToMove = e.target.dataset;
      setMovedTask(taskToMove);
    };

    const handleDrop = (e) => {
      const nextActions = project.nextActions.slice();
      const targetAction = nextActions.find(
        (action) => parseInt(action.step) === parseInt(movedTask.step)
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
          !action.wasJustMoved === true &&
          parseInt(action.step) === parseInt(movedTask.step)
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
      //Clears the moved task from state
      setMovedTask("");
    };

    const renderProjects = () => {
      return project.nextActions.map((action) => (
        <RenderAction
          action={action}
          key={project.id + action.step}
          project={project}
          needsURL={false}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      ));
    };

    const starLogic = () => {
      return project.starred ? (
        <span
          className="material-icons"
          data-id={project.id}
          onClick={toggleStar}
        >
          star
        </span>
      ) : (
        <span
          className="material-icons"
          data-id={project.id}
          onClick={toggleStar}
        >
          star_border
        </span>
      );
    };

    return (
      <div className="container">
        <div className="project" key={project.id}>
          <div className="project-head">
            {starLogic()}
            {displayLink()}
            <div>
              <span
                className="material-icons"
                data-id={project.id}
                onClick={deleteProject}
              >
                delete_outline
              </span>
            </div>
          </div>
          <div className="project-body">
            <ol>{renderProjects()}</ol>
            <AddActionForm projectId={project.id} />
          </div>
          <div className="project-footer">
            {archivedLogic()}
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
