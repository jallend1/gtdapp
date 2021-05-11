import { useContext } from 'react';
import {
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { ProjectContext } from '../../Contexts/ProjectContext';

import AddActionForm from './AddActionForm';

const ActionList = ({ project }) => {
  const { completeAction, removeAction } = useContext(ProjectContext);
  return (
    <CardContent>
      <List>
        {project.nextActions.map((action, index) => (
          <ListItem key={index + project.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={action.isComplete}
                inputProps={{ 'data-step': index, 'data-id': project.id }}
                onClick={completeAction}
              />
            </ListItemIcon>
            <ListItemText primary={action.action} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeAction(index, project.id)}
              >
                <DeleteForeverOutlined />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddActionForm projectId={project.id} />
    </CardContent>
  );
};

export default ActionList;
