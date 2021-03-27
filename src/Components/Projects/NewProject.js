import { useState, useContext, useEffect} from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import { db } from "../../firebaseConfig";
import AddActionForm from "./AddActionForm";
import RenderAction from './RenderAction'

const NewProject = () => {
  const { projects } = useContext(
    ProjectContext
  );

  const [projectTitle, setProjectTitle] = useState("");
  const [nextActions, setNextActions] = useState([]);
  const [title, setTitle] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [project, setProject] = useState("");
  

  async function createTitle() {
    setTitle(true);
    const newProject = db.collection("projects").doc()
    const newProjectRef = await newProject.get();
    await db.collection('projects').doc(newProjectRef.id).set({
      title: projectTitle,
      nextActions: [],
      archived: false,
      starred: false,
      id: newProjectRef.id,
      createdAt: Date.now(),
    })
    setProjectID(newProject.id);
    setProject(db.collection('projects').doc().get().then(project => project.data()))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("projects").doc(projectID).update({
      nextActions: nextActions,
    });
  };

  

  const renderActions = () => {
    
      return nextActions.map((action) => (
        <RenderAction
        action={action}
        key={projectID + action.step}
        project={project}
        needsURL={false}
      />
    ))
  }
  
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
          )}
        </div>
        <ol>
          {title ? renderActions() : 'Nothing to display'}
        </ol>
        {projectTitle ? <AddActionForm projectId={projectID} /> : null}
        <button onClick={handleSubmit}>Create New Project</button>
      </section>
    </div>
  );
};

export default NewProject;
