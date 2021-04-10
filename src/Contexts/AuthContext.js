import React, { createContext } from 'react';
import { auth, fb } from '../firebaseConfig'

export const AuthContext = createContext();
class AuthContextProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    googleSignIn = () => {
        const provider = new fb.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => console.log(result))
        this.setState({isLoggedIn: true})
    }

    signOut = (e) => {
        e.preventDefault();
        auth.signOut().then(() => console.log('logged out!'));
        this.setState({isLoggedIn: false})
    }
    
    signIn = (e, isNewUser) => {
        e.preventDefault();
        const email = e.target.user.value;
        const password = e.target.pass.value;
        isNewUser ? auth.createUserWithEmailAndPassword(email, password) : auth.signInWithEmailAndPassword(email, password);
        this.setState({isLoggedIn: true})
        e.target.reset();
    }

    render() {
        return (
            <AuthContext.Provider value={{ isLoggedIn: this.state.isLoggedIn, googleSignIn: this.googleSignIn, signOut: this.signOut, signIn: this.signIn}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider;