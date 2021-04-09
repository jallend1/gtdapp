import {useContext} from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthContext';

const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <nav className="blue">
        <div className="nav-content">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/projects">All Projects</NavLink>
            </li>
            <li>
              <NavLink to="/active">Active Projects</NavLink>
            </li>
            <li>
              <NavLink to="/archive">Archive</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
        <div>
          {isLoggedIn ? 'Logout' : 'Login'}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
