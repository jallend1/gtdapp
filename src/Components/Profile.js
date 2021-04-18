import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Profile = () => {
    const {user} = useContext(AuthContext);
    const { displayName, email, photoURL } = user;
    console.log(user)
    
    return (
        <div className="container">
            <h2>Profile Page</h2>    
            <img src={photoURL} alt="User display" className="profile-logo"/>
            <div>
                <p>{displayName}</p>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default Profile;