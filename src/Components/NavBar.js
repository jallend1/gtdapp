import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const NavBar = () => {
  const { isLoggedIn, signOut, user } = useContext(AuthContext);
  
  const noUser = () => {
    return (
      <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Create Account</NavLink>
        </li>
      </>
    )
  }

  const userDetails = () => {
    return (
      <>
        <li className="userDetails" onClick={signOut}>Sign out</li>
        <li className="userDetails">
          <NavLink to="/profile">
            {user.photoURL ? <img src={user.photoURL} alt="profile" className="profile-pic" />
              : (user.displayName ? user.displayName : user.email)}
          </NavLink>
        </li>
      </>
    )
  }

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
            {isLoggedIn ? userDetails() : noUser()}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
