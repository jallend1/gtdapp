import { useContext } from 'react';
import {AuthContext} from '../../Contexts/AuthContext';

const SignUp = () => {
    const { signUp, isLoggedIn } = useContext(AuthContext);
    
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
            {isLoggedIn ? 'Logged in!' : loginForm()}
        </>
    )
}

export default SignUp;