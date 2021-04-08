import React, { createContext } from 'react';
import { auth } from '../firebaseConfig'

export const AuthContext = createContext();
class AuthContextProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    signUp = (e) => {
        // auth.createUserWithEmailAndPassword(login.user, login.pass);
        e.preventDefault();
        console.log(e);
    }

    render() {
        return (
            <AuthContext.Provider value={{ isLoggedIn: this.state.isLoggedIn, signUp: this.signUp}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider;