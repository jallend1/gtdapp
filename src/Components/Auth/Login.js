import { useContext } from "react";
import { Button, TextField } from '@material-ui/core';
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
        <Button onClick={googleSignIn} variant="contained" color="secondary">
          Sign in with Google
        </Button>
        <form id="signup" onSubmit={(e) => signIn(e, newUser)}>
          <TextField type="email" id="user" label="User" />
          {/* <input type="email" id="user" placeholder="user" /> */}
          <TextField type="password" id="pass" label="Password" />
          {/* <input type="password" id="pass" placeholder="password" /> */}
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          {/* <input type="submit" /> */}
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
