import { useState } from "react";
import AddActionForm from "./AddActionForm";

const NewProject = ({ projects, addProject }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [nextActions, setNextActions] = useState([]);
  
  const addAction = e => {
    const actions = nextActions;
    actions.push(e);
    setNextActions(actions);
    console.log(nextActions);
  }

  const handleSubmit = (e) => {
    console.log(e.target)
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
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
              
            />
          </div>
        
          <AddActionForm addAction = {addAction} />
          <button type="submit" onSubmit = {handleSubmit}>Submit</button>
        
      </section>
    </div>
  );
};

export default NewProject;
