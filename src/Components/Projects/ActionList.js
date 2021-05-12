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

const ActionList = ({ projectID, index, action }) => {
  const { completeAction, removeAction } = useContext(ProjectContext);
  return (
          <>
          <ListItem key={index + projectID}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={action.isComplete}
                inputProps={{ 'data-step': index, 'data-id': projectID }}
                onClick={completeAction}
              />
            </ListItemIcon>
            <ListItemText primary={action.action} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeAction(index, projectID)}
              >
                <DeleteForeverOutlined />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
      
      </>
  )
  
};

export default ActionList;
