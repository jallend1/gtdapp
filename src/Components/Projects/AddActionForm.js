import { useState, useContext } from "react";
import { ProjectContext } from '../../Contexts/ProjectContext';
const AddActionForm = ({projectId }) => {
  const [nextAction, setNextAction] = useState("");
  const {addAction} = useContext(ProjectContext)

  const handleChange = (e) => {
    setNextAction(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        addAction(e, projectId);
        setNextAction("");
      }}
    >
      <label htmlFor="nextAction1">Add a next action:</label>
      <input
        type="text"
        name="nextAction"
        id="nextAction"
        placeholder="The very next action"
        onChange={handleChange}
        value={nextAction}
      ></input>
    </form>
  );
};

export default AddActionForm;
