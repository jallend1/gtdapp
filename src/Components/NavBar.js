import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const NavBar = () => {
  const { isLoggedIn, signOut, user } = useContext(AuthContext);
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
          <ul className="right">
            {isLoggedIn ? (
              <>
                <li onClick={signOut}>Sign out</li>
                <li>{user.photoURL ? <img src={user.photoURL} alt="profile" className="profile"/> : user.displayName}</li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Create Account</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
