import { Link } from "react-router-dom";
const UserInfo = ({ user, isLoggedIn }) => {
  const noUser = () => {
    return (
      <div>
        Not logged in yet. <Link to="/login">Log in?</Link>
      </div>
    );
  };

  const userDeets = () => {
    const image = user.photoURL || null;
    const displayName = user.displayName || user.email || "No name provided";
    return (
      <div>
        Logged in as:
        <div>
          {image ? (
            <img src={image} alt="profile" />
          ) : (
            <span className="material-icons">account_circle</span>
          )}
          {displayName}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>{isLoggedIn === true ? userDeets() : noUser()}</div>
    </>
  );
};

export default UserInfo;
