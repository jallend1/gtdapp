import { useContext } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { ProjectContext } from '../../Contexts/ProjectContext';

const ActionList = ({ projectID, action }) => {
  console.log(action)
  const { completeAction, removeAction } = useContext(ProjectContext);
  return (
          <>
          <ListItem key={action.step + projectID}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={action.isComplete}
                inputProps={{ 'data-step': action.step, 'data-id': projectID }}
                onClick={(e) => completeAction(e, action.step, projectID)}
              />
            </ListItemIcon>
            <ListItemText primary={action.action} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeAction(action.step, projectID)}
              >
                <DeleteForeverOutlined />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
      
      </>
  )
  
};

export default ActionList;
