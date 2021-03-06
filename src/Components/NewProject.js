import {useState} from 'react';
import AddAction from './AddAction';

const NewProject = ({projects, addProject}) => {
  const [projectTitle, setProjectTitle] = useState('')
  const [nextActions, setNextActions] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title: projectTitle,
      nextActions: [],
      archived: false,
      starred: false,
      id: Math.random()
    }
    addProject(newProject);
  }
  return (
    <div className="new-project">
      <header>
        <h2>New Project</h2>
      </header>
      <section>
        <form onSubmit= {handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Name your project"
              onChange = {(e) => {
                setProjectTitle(e.target.value);
              }}
              onSubmit = {e => {
                
              }}
            />
          </div>
          <AddAction nextActions = {nextActions} />
        <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default NewProject;
