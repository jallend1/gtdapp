import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import Project from "./Project";
import NoProjects from "./NoProjects";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const ProjectList = (props) => {
  const { projects } = useContext(ProjectContext);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    }
  }))
  const classes = useStyles();
  const renderProjects = () => {
    let projectsToShow;
    if (props.match.path === "/archive") {
      projectsToShow = projects.filter((project) => project.archived);
    } else if (props.match.path === "/active") {
      projectsToShow = projects.filter((project) => !project.archived);
    } else {
      projectsToShow = projects.slice();
    }
    return (
      <Grid container spacing={3} >
        {projectsToShow.map((project) => (
            <Grid item sm={12} md={6} lg={4} key={project.id}>
              <Project id={project.id} projects={projects} />
            </Grid>
        )
        )}
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <header id="projectList" className="space-around">
        <Typography variant="h2">Project List</Typography>
        <Link to="/projects/new">
          <h2>
            <span className="material-icons">add_task</span> Add New Project
          </h2>
        </Link>
      </header>
      <main>{projects.length === 0 ? <NoProjects /> : renderProjects()}</main>
    </div>
  );
};

export default ProjectList;
