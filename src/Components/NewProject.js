import { useState } from "react";
import AddActionForm from "./AddActionForm";

const NewProject = ({ projects, addProject }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [nextActions, setNextActions] = useState([]);

  const addAction = (e, newAction) => {
    e.preventDefault();
    setNextActions([...nextActions, newAction]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title: projectTitle,
      nextActions: nextActions,
      archived: false,
      starred: false,
      id: Math.random(),
    };
    addProject(newProject);
  };
  return (
    <div className="new-project">
      <header>
        <h2>New Project</h2>
      </header>
      <section>
        <div>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Name your project"
            value={projectTitle}
            onChange={(e) => {
              setProjectTitle(e.target.value);
            }}
          />
        </div>
        <ol>
          {nextActions.map((nextAction, index) => (
            <li key={index}>{nextAction}</li>
          ))}
        </ol>
        {projectTitle ? <AddActionForm addAction={addAction} /> : null}
        <button onClick={handleSubmit}>Create New Project</button>
      </section>
    </div>
  );
};

export default NewProject;
