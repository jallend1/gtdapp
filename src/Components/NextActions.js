const NextActions = ({projects}) => {
  const determineNextAction = project => {
    const actionList = project.nextActions.filter(action => action.isComplete === false);
    
    console.log(actionList.sort((a, b) => a.step < b.step))
    if(actionList[0]){
      return (
        <p>{actionList[0].action}</p>
      )
    }
    else{
      return null;
    }
  }
  console.log(projects)
  return (
    <div>
      <h2>List of Next Actions</h2>
      {projects && projects.map(project => determineNextAction(project))}
    </div>
  );
};

export default NextActions;
