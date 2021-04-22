import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { ProjectContext } from "../../Contexts/ProjectContext";
import { AuthContext } from "../../Contexts/AuthContext";
import AddActionForm from "./AddActionForm";
import RenderAction from "./RenderAction";

const NewProject = () => {
  const { projects } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [projectTitle, setProjectTitle] = useState("");
  const [title, setTitle] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [project, setProject] = useState("");

  async function createTitle() {
    setTitle(true);
    const newProject = db
      .collection("projects")
      .doc(user.uid)
      .collection("projects")
      .doc();
    const newProjectRef = await newProject.get();
    await db
      .collection("projects")
      .doc(user.uid)
      .collection("projects")
      .doc(newProjectRef.id)
      .set({
        title: projectTitle,
        nextActions: [],
        archived: false,
        starred: false,
        id: newProjectRef.id,
        createdAt: Date.now(),
        userId: user.uid,
      });
    setProjectID(newProject.id);
  }

  const renderActions = () => {
    if (project) {
      return project.nextActions.map((action) => (
        <RenderAction
          action={action}
          key={projectID + action.step}
          project={project}
          needsURL={false}
        />
      ));
    } else return null;
  };

  const retrieveProject = () => {
    if (projectID !== "") {
      const newProject = projects.find((project) => projectID === project.id);
      setProject(newProject);
    }
  };

  useEffect(retrieveProject, [projects, projectID]);

  return (
    <div className="new-project">
      <header>
        <h2>New Project</h2>
      </header>
      <section>
        <div>
          {title ? (
            <h3 id={projectID}>{projectTitle}</h3>
          ) : (
            <form onSubmit={createTitle}>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Name your project"
                value={projectTitle}
                onChange={(e) => {
                  setProjectTitle(e.target.value);
                }}
                onBlur={createTitle}
              />
            </form>
          )}
        </div>
        <ol>{projectTitle ? renderActions() : "No actions added yet"}</ol>
        {projectTitle ? <AddActionForm projectId={projectID} /> : null}
        <button
          type="button"
          className="btn-large"
          onClick={() => history.push("/")}
        >
          Create New Project
        </button>
      </section>
    </div>
  );
};

export default NewProject;
