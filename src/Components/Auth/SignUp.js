import { useContext } from 'react';
import {AuthContext} from '../../Contexts/AuthContext';

const SignUp = () => {
    const { signUp } = useContext(AuthContext);
    return (
        <>
            <div className="sign-up">
                <form id="signup" onSubmit={signUp}>
                    <input type="email" id="user" placeholder="user" />
                    <input type="password" id="pass" placeholder="password"/>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

export default SignUp;