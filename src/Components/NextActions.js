import RenderAction from "./RenderAction";

const NextActions = ({ projects, completeAction }) => {
  const determineNextAction = (project) => {
    console.log(project)
    const actionList = project.nextActions.filter(
      (action) => action.isComplete === false
    );
    if (actionList[0]) {
      return (
        <RenderAction
          action={actionList[0]}
          project={project}
          key={project.id + actionList[0].step * 0.1}
          completeAction={completeAction}
          needsURL={true}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <h2>List of Next Action From Each Project</h2>
      <ul>
        {projects && projects.map((project) => determineNextAction(project))}
      </ul>
    </div>
  );
};

export default NextActions;
