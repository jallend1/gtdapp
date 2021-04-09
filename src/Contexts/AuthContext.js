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
        e.preventDefault();
        const userName = e.target.user.value;
        const password = e.target.pass.value;
        // auth.createUserWithEmailAndPassword(userName, password).then((credentials) => {
        //     console.log(credentials)
        // })
        this.setState({isLoggedIn: true})
        e.target.reset();
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