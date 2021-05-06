import { useContext } from "react";

import { AuthContext } from "./Contexts/AuthContext";

import Main from "./Components/Main";
import Login from "./Components/Auth/Login";
import Footer from "./Components/Footer";

import Layout from "./Components/Layout";

function App() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  return (
    <div className="App">
      <Layout>
        {isLoading ? <h3>Loading...</h3> : isLoggedIn ? <Main /> : <Login />}
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
