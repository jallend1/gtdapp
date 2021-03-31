import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import { db } from "../../firebaseConfig";

const ProjectHeader = ({ project, match }) => {
  const { deleteAction, toggleStar } = useContext(ProjectContext);
  const history = useHistory();
  const [title, setTitle] = useState(project.title);
  const [editing, setEditing] = useState(false);

  const deleteProject = (e) => {
    deleteAction(e, true);
    history.push("/");
  };

  const displayLink = () => {
    // If there is a match property, means we are on the project page and avoids displaying a link
    return match ? (
      <div className="project-title">
        <h3>{title}</h3>
        <span className="material-icons" onClick={() => setEditing(!editing)}>
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
    return (
      <form onSubmit={updateTitle}>
        <input
          type="textbox"
          value={title}
          id="titleBox"
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    );
  };

  const updateTitle = (e) => {
    e.preventDefault();
    db.collection("projects").doc(project.id).update({
      title: title,
    });
    setEditing(false);
  };

  return (
    <div className="project-head">
      <span
        className="material-icons"
        data-id={project.id}
        onClick={toggleStar}
      >
        {project.starred ? "star" : "star_border"}
      </span>
      {editing ? editTitle() : displayLink()}
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
  );
};

export default ProjectHeader;
