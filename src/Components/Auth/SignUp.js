import { useContext } from 'react';
import {AuthContext} from '../../Contexts/AuthContext';

const SignUp = (props) => {
    const { signUp } = useContext(AuthContext)
    return (
        <>
            <div>
                <form id="signup" onSubmit={signUp}>
                    <input type="text" id="user" placeholder="user" />
                    <input type="password" id="pass" placeholder="password"/>
                </form>
            </div>
        </>
    )
}

export default SignUp;