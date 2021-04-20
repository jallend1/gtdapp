import { useContext, useState, useEffect } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

import RenderAction from "./RenderAction";
import NoProjects from "./NoProjects";

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  const [sortDate, setSortDate] = useState(true);
  const [nextActionList, setNextActionList] = useState([]);

  const determineNextAction = () => {
    const newActionList = [];
    projects.forEach((project) => {
      // Extracts all the incomplete items from the project
      const actionList = project.nextActions.filter(
        (action) => action.isComplete === false
      );
      let nextAction;
      if (actionList[0]) {
        nextAction = {
          action: actionList[0],
          project: project,
          key: project.id + actionList[0].step,
          isNextActionPage: true,
          created: project.createdAt,
        };
        newActionList.push(nextAction);
      } else {
        return null;
      }
    });
    sortDate
      ? newActionList.sort((a, b) => (a.created < b.created ? -1 : 1))
      : newActionList.sort((a, b) => (a.created > b.created ? -1 : 1));
    setNextActionList(newActionList);
  };

  const renderProjects = () => {
    return nextActionList.map((nextAction) => {
      return (
        <RenderAction
          action={nextAction.action}
          project={nextAction.project}
          key={nextAction.key}
          isNextActionPage={nextAction.isNextActionPage}
        />
      );
    });
  };

  const toggleSort = () => {
    setSortDate(!sortDate);
  };

  useEffect(determineNextAction, [projects, sortDate]);

  return (
    <div>
      <h2>Next Actions</h2>
      <button className="btn-small" onClick={toggleSort}>
        <i className="material-icons left">swap_vert</i>
        Sort by <span>{sortDate ? "newest" : "oldest"} </span>
      </button>
      <ul>{projects.length === 0 ? <NoProjects /> : renderProjects()}</ul>
    </div>
  );
};

export default NextActions;
