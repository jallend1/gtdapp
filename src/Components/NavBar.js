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
    );
  };

  const userDetails = () => {
    return (
      <>
        <li className="userDetails" onClick={signOut}>
          Sign out
        </li>
        <li className="userDetails">
          <NavLink to="/profile">
            {user.photoURL ? (
              <img src={user.photoURL} alt="profile" className="profile-pic" />
            ) : user.displayName ? (
              user.displayName
            ) : (
              user.email
            )}
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <>
      <nav>
        <div className="blue nav-wrapper">
          <div className="nav-content">
            <ul className="left">
              <li>
                <NavLink exact to="/" activeStyle={{fontWeight: "bold", color: "black"}}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/projects" activeStyle={{fontWeight: "bold", color: "black"}}>All Projects</NavLink>
              </li>
              <li>
                <NavLink to="/active" activeStyle={{fontWeight: "bold", color: "black"}}>Active Projects</NavLink>
              </li>
              <li>
                <NavLink to="/archive" activeStyle={{fontWeight: "bold", color: "black"}}>Archive</NavLink>
              </li>
              <li>
                <NavLink to="/about" activeStyle={{fontWeight: "bold", color: "black"}}>About</NavLink>
              </li>
            </ul>
            <ul className="right">{isLoggedIn ? userDetails() : noUser()}</ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
