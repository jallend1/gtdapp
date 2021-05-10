import { Typography, Button } from '@material-ui/core';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const { displayName, email, photoURL } = user;

  return (
    <div className="container">
      <Typography variant="h2">Your Profile</Typography>
      <img src={photoURL} alt="User display" className="profile-logo" />
      <div>
        <Typography variant="h6">Name: {displayName}</Typography>
        <Typography variant="h6">Email: {email}</Typography>
      </div>
      <Button color="secondary" variant="contained" onClick={signOut}>
        Log Out
      </Button>
    </div>
  );
};

export default Profile;
