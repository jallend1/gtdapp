import { useContext } from "react";
import RenderAction from "./RenderAction";
import { ProjectContext } from "../../Contexts/ProjectContext";

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  const determineNextAction = (project) => {
    const actionList = project.nextActions.filter(
      (action) => action.isComplete === false
    );
    if (actionList[0]) {
      return (
        <RenderAction
          action={actionList[0]}
          project={project}
          key={project.id + actionList[0].step}
          needsURL={true}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <h2>Next Actions</h2>
      <ul>
        {projects && projects.map((project) => determineNextAction(project))}
      </ul>
    </div>
  );
};

export default NextActions;
