import { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../../Contexts/ProjectContext';
import { Button, List, Typography } from '@material-ui/core';
import { SwapVert } from '@material-ui/icons';

import ActionList from './ActionList';
import NoProjects from './NoProjects';

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  const [sortDate, setSortDate] = useState(true);
  const [nextActionList, setNextActionList] = useState([]);

  const determineNextAction = () => {
    const newActionList = [];
    projects.forEach((project) => {
      // Extracts all the incomplete items from the project
      // TODO: Return the index as part of the element as it currently just toggles the first item in the list off and on
      const actionList = project.nextActions.filter(
        (action, index) => action.isComplete === false
      );
      if (actionList[0]) {
        let nextAction = actionList[0]
        nextAction.id = project.id
        nextAction.index = index;
        newActionList.push(nextAction);
      } else {
        return null;
      }
    });
    // Sorts by date as indicated by user preference
    sortDate
      ? newActionList.sort((a, b) => (a.created < b.created ? -1 : 1))
      : newActionList.sort((a, b) => (a.created > b.created ? -1 : 1));
    // Puts next actions from starred projects at top of feed
    newActionList.sort((a, b) =>
      a.starred === b.starred ? 0 : a.starred && !b.starred ? -1 : 1
    );
    setNextActionList(newActionList);
  };

  const renderProjects = () => {
    // TODO: Pass prop indicating need for secondary text?
    return nextActionList.map((action, index) => {
      return (
        <ActionList projectID={action.id} action={action} index={index} key={action.id} />
      );
    });
  };

  const toggleSort = () => {
    setSortDate(!sortDate);
  };

  useEffect(determineNextAction, [projects, sortDate]);

  return (
    <div>
      <Typography variant="h2">Next Actions</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleSort}
        startIcon={<SwapVert />}
      >
        Sort by {sortDate ? 'newest' : 'oldest'}
      </Button>
      <ul>
        {projects.length === 0 ? (
          <NoProjects />
        ) : (
          <List> {renderProjects()} </List>
        )}
      </ul>
    </div>
  );
};

export default NextActions;
