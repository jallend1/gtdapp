import {useState } from 'react';
const AddActionForm = ({addAction}) => {
  const [nextAction, setNextAction] = useState('');
  
  const handleChange = (e) =>{
    setNextAction(e.target.value);
  }

  return (
    <form onSubmit = {(e) => {
      addAction(e, nextAction);
      setNextAction('');
      }
      }>
      <label htmlFor="nextAction1">Add a next action:</label>
      <input
        type="text"
        name="nextAction"
        id="nextAction"
        placeholder="The very next action"
        onChange = {handleChange}
        value = {nextAction}
      ></input>
    </form>
  );
};

export default AddActionForm;
