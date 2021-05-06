import { TextField } from "@material-ui/core";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProjectContext } from "../../Contexts/ProjectContext";
const AddActionForm = ({ projectId }) => {
  const history = useHistory();
  const [nextAction, setNextAction] = useState("");
  const { addAction } = useContext(ProjectContext);

  const handleChange = (e) => {
    setNextAction(e.target.value);
  };

  const handleSubmit = (e) => {
    const task = e.target.nextAction.value;
    // If the next action input is blank when submitted AND is on the NEW project page (History does not exist on individual project page), navigates away from current page back home
    if (task.trim().length === 0 && history.location.pathName) {
      history.push("/");
    }
    // Otherwise, if the new task is blank on an existing project page, just ignores it
    else if (task.trim().length === 0) {
      e.preventDefault();
      return;
    } else {
      addAction(e, projectId);
      setNextAction("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="nextAction" label="Add the next action" onChange={handleChange} value={nextAction} />
    </form>
  );
};

export default AddActionForm;
