import { useContext } from 'react';
import { auth, fb } from '../../firebaseConfig';
import { AuthContext } from '../../Contexts/AuthContext';

const SignUp = () => {
    const { signUp, isLoggedIn } = useContext(AuthContext);
    
    const googleSignIn = () => {
        console.log('happening')
        const provider = new fb.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => console.log(result))
        
        
    }
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