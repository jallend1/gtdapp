import { Link } from 'react-router-dom';
const ActionDetails = (project) => {
    const calculateDate = () => {
        const date = new Date(project.createdAt);
        return date.toDateString();
    }
    return (
    <>
        <div id="details" className="details">
          <div>
            Added: {calculateDate()}
          </div>
              <div>
                From: <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </div>
              <div>
                Remaining Tasks: {project.nextActions.filter(project => project.isComplete === false).length}
              </div>
              <div>
                Total Tasks: {project.nextActions.length}
              </div>
              </div>
            </>
)
}

export default ActionDetails;