import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProjectContext } from '../../Contexts/ProjectContext';
import { AuthContext } from '../../Contexts/AuthContext';

import AddActionForm from './AddActionForm';
import ActionList from './ActionList';
import { db } from '../../firebaseConfig';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  makeStyles
} from '@material-ui/core';
import {
  ArchiveOutlined,
  Star,
  StarBorderOutlined,
  UnarchiveOutlined
} from '@material-ui/icons';

const Project = (props) => {
  const { projects, toggleArchive, toggleStar } = useContext(ProjectContext);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: '#EEE'
    }
  }));

  const classes = useStyles();

  const { user } = useContext(AuthContext);
  // If id property comes back from Params, uses that, otherwise takes the id passed in
  const id = useParams().id || props.id;
  // If projects are loaded, but none match ID, throw an error
  if (projects.length > 0 && !projects.find((project) => project.id === id)) {
    return <h3>Sorry, we weren't able to find that project.</h3>;
  }
  // If projects are loaded, displays it
  else if (projects.length > 0) {
    const project = projects.find((project) => project.id === id);
    const jsDate = new Date(project.createdAt).toUTCString();

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      e.target.id = 'movedElement';
      e.target.classList.add('action-drag');
      e.dataTransfer.setData('step', e.target.dataset.step);
    };

    const handleDrop = (e) => {
      removeStyle();
      const unmovedActionStep = parseInt(e.target.dataset.step);
      const movedTaskStep = parseInt(e.dataTransfer.getData('step'));
      const nextActions = project.nextActions.slice();
      // Finds the moved action in the array
      const targetAction = nextActions.find(
        (action) => parseInt(action.step) === movedTaskStep
      );
      // Makes a deep copy of that object
      const newAction = JSON.parse(JSON.stringify(targetAction));
      // Adds a status field to distinguish it from the original one we need to delete
      newAction.wasJustMoved = true;
      // If the item being moved comes from further down the list, drops it above of the unmoved action
      if (unmovedActionStep < movedTaskStep) {
        nextActions.splice(unmovedActionStep, 0, newAction);
      }
      //Otherwise, drops it BELOW
      else {
        nextActions.splice(unmovedActionStep + 1, 0, newAction);
      }
      // Retrieves the index of the original one we need to remove and does so
      const toDelete = nextActions.findIndex(
        (action) =>
          !action.wasJustMoved === true &&
          parseInt(action.step) === movedTaskStep
      );
      nextActions.splice(toDelete, 1);
      // Maps over updated array to reorder the array to match the new order and reset attributes for further movement
      const newActionOrder = nextActions.map((action, index) => {
        action.wasJustMoved = false;
        action.step = index;
        return action;
      });
      //Sends new action order to Firebase
      db.collection('projects')
        .doc(user.uid)
        .collection('projects')
        .doc(project.id)
        .update({
          nextActions: newActionOrder
        });
      e.dataTransfer.clearData();
    };

    const removeStyle = () => {
      const movedElement = document.getElementById('movedElement');
      movedElement.classList.remove('action-drag');
      movedElement.id = null;
    };

    return (
      <div className="container">
        <Card className={classes.root}>
          <CardHeader
            title={project.title}
            action={
              <IconButton
                aria-label="star"
                onClick={() => toggleStar(project.id)}
              >
                {project.starred ? <Star /> : <StarBorderOutlined />}
              </IconButton>
            }
            subheader={`Created at: ${jsDate}`}
          />
          <CardContent>
            <List>
              {project.nextActions.map((action, index) => (
                <ActionList projectID={project.id} action={action} index={index} />
              ))}
              </List>
              <AddActionForm projectId={project.id} />
              </CardContent>
          <CardActions>
            <IconButton onClick={(e) => toggleArchive(e, project.id)}>
              {project.archived ? <UnarchiveOutlined /> : <ArchiveOutlined />}
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
  // Loading screen while projects are retrieved
  else {
    return <h3>Loading...</h3>;
  }
};

export default Project;
