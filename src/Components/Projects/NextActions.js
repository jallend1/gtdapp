import { useContext, useState, useEffect } from "react";
import RenderAction from "./RenderAction";
import { ProjectContext } from "../../Contexts/ProjectContext";

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  const [sortDate, setSortDate] = useState(true);
  const [nextActionList, setNextActionList] = useState([])
  
  const determineNextAction = () => {
    const newActionList = [];
    projects.forEach(project => { 
      const actionList = project.nextActions.filter(
        (action) => action.isComplete === false
      );
      let nextAction;
      if(actionList[0]){
        nextAction = {
          action: actionList[0],
          project: project,
          key: project.id + actionList[0].step,
          needsURL: true,
          created: project.createdAt
        }
        newActionList.push(nextAction)
      }
      else {
        return null;
      }
    });
    sortDate ? newActionList.sort((a, b) => a.created < b.created ? -1 : 1) : newActionList.sort((a,b) => a.created > b.created ? -1 : 1);
    setNextActionList(newActionList);
  };

  const renderProjects = () => {
    return nextActionList.map(nextAction => {
      return <RenderAction
      action={nextAction.action}
      project={nextAction.project}
      key={nextAction.key}
      needsURL={nextAction.needsURL}
    />
    })
  }

  const toggleSort = () => {
    setSortDate(!sortDate);
  }

  
  useEffect(determineNextAction, [projects, sortDate])

  return (
    <div>
      <h2>Next Actions</h2>
      <div onClick={toggleSort}>
        <span className="material-icons">swap_vert</span>
        Sort <span>{sortDate ? 'newest' : 'oldest'} </span> projects first

      </div>
      <ul>
        {projects && renderProjects()}
      </ul>
    </div>
  );
};

export default NextActions;
