import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Profile = () => {
    const {user} = useContext(AuthContext);
    const { displayName, email, photoURL } = user;
    console.log(user)
    
    return (
        <div className="container">
            <h2>Your Profile</h2>    
            <img src={photoURL} alt="User display" className="profile-logo"/>
            <div>
                <p>Name: {displayName}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    )
}

export default Profile;