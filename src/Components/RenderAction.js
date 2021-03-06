import { Link } from 'react-router-dom';

const RenderAction = ({action, project}) => {
    return (
        <div className="action">
          <div className="material-icons">
              delete_outline
          </div>  
          <li>
            <div>
                {action.action}
                {action.isComplete ? <input type="checkbox" checked /> : <input type="checkbox" />}
            </div>
            <div className="subtitle">
                From: <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </div>
          </li>
        </div>
    )
}

export default RenderAction;