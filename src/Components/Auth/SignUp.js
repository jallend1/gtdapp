import { useContext } from 'react';
import { auth, fb } from '../../firebaseConfig';
import { AuthContext } from '../../Contexts/AuthContext';

const SignUp = () => {
    const { signUp, googleSignIn, isLoggedIn } = useContext(AuthContext);
    
    const loginForm = () => {
        return (
            <div className="sign-up">
                <form id="signup" onSubmit={signUp}>
                    <input type="email" id="user" placeholder="user" />
                    <input type="password" id="pass" placeholder="password"/>
                    <input type="submit" />
                </form>
            </div>
            )
    }

    return (
        <>
            <button onClick={googleSignIn} className="btn">Sign in with Google</button>
            {isLoggedIn ? 'Logged in!' : loginForm()}
        </>
    )
}

export default SignUp;