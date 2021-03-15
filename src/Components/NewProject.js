import { useState } from "react";
import { db } from "../firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";
import AddActionForm from "./AddActionForm";

const NewProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [nextActions, setNextActions] = useState([]);

  const addAction = (e, incomingAction) => {
    e.preventDefault();
    const newAction = {
      action: incomingAction,
      isComplete: false,
      step: nextActions.length + 1,
    };
    setNextActions([...nextActions, newAction]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProjectRef = db.collection('projects').doc();
    newProjectRef.set({
      title: projectTitle,
      nextActions: nextActions,
      archived: false,
      starred: false,
      id: newProjectRef.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
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
            <li key={index}>{nextAction.action}</li>
          ))}
        </ol>
        {projectTitle ? <AddActionForm addAction={addAction} /> : null}
        <button onClick={handleSubmit}>Create New Project</button>
      </section>
    </div>
  );
};

export default NewProject;
