import { useContext } from "react";

import { AuthContext } from "../../Contexts/AuthContext";

const Login = (props) => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  let newUser;
  if (props.match) {
    props.match.path === "/login" ? (newUser = false) : (newUser = true);
  } else {
    newUser = false;
  }

  const loginForm = () => {
    return (
      <div className="sign-up">
        <button onClick={googleSignIn} className="btn">
          Sign in with Google
        </button>
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
      <h4>{newUser ? "Create a New Account" : "Login"}</h4>
      {loginForm()}
    </>
  );
};

export default Login;
