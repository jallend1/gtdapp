import React, { createContext } from "react";
import { auth, fb } from "../firebaseConfig";

export const AuthContext = createContext();
class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      user: null,
    };
  }

  componentDidMount() {
    // Sets up listener to Firebase auth state
    auth.onAuthStateChanged(this.authState);
  }

  authState = (user) => {
    // If user is returned, updates state with appropriate info
    if (user) {
      this.setState({ user: user, isLoading: false, isLoggedIn: true });
    } else {
      this.setState({ user: null, isLoggedIn: false, isLoading: false });
    }
  };

  googleSignIn = () => {
    const provider = new fb.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  signOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => auth.onAuthStateChanged(this.authState));
  };

  signIn = (e, isNewUser) => {
    e.preventDefault();
    const email = e.target.user.value;
    const password = e.target.pass.value;
    isNewUser
      ? auth.createUserWithEmailAndPassword(email, password)
      : auth.signInWithEmailAndPassword(email, password);
    e.target.reset();
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          googleSignIn: this.googleSignIn,
          signOut: this.signOut,
          signIn: this.signIn,
          user: this.state.user,
          isLoading: this.state.isLoading,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
