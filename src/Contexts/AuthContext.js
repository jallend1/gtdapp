// TODO: Navbar not updating to reflect current authentication status

import React, { createContext } from 'react';
import { auth, fb } from '../firebaseConfig'

export const AuthContext = createContext();
class AuthContextProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            isLoggedIn: false,
            user: null
        }
    }

    componentDidMount(){
        // Sets up listener to Firebase auth state
        auth.onAuthStateChanged(this.authState);
    }

    authState = user => {
        // If user is returned, updates state with appropriate info
        console.log(user)
        if(user){
            this.setState({user: user, loading: false, isLoggedIn: true});
        }
    }

    googleSignIn = () => {
        const provider = new fb.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    signOut = (e) => {
        e.preventDefault();
        auth.signOut().then(() => console.log('logged out!'));
    }
    
    signIn = (e, isNewUser) => {
        e.preventDefault();
        const email = e.target.user.value;
        const password = e.target.pass.value;
        isNewUser ? auth.createUserWithEmailAndPassword(email, password) : auth.signInWithEmailAndPassword(email, password);
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