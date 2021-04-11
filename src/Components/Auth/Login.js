import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const Login = (props) => {
  const { signIn, googleSignIn, isLoggedIn } = useContext(AuthContext);
  let newUser;
  props.match.path === "/login" ? (newUser = false) : (newUser = true);

  const loginForm = () => {
    return (
      <div className="sign-up">
        <form id="signup" onSubmit={(e) => signIn(e, newUser)}>
          <input type="email" id="user" placeholder="user" />
          <input type="password" id="pass" placeholder="password" />
          <input type="submit" />
        </form>
      </div>
    );
  };

  return (
    <>
      <h4>Create a New Account</h4>
      <button onClick={googleSignIn} className="btn">
        Sign in with Google
      </button>
      {isLoggedIn ? "Logged in!" : loginForm()}
    </>
  );
};

export default Login;
