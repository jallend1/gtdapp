import { useContext } from 'react';

import { AuthContext } from "./Contexts/AuthContext";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Main from './Components/Main';
import Login from "./Components/Auth/Login";
import Footer from "./Components/Footer";

function App() {
  const {isLoggedIn, isLoading} = useContext(AuthContext);
  return (
    <div className="App">
        <NavBar />
        <Header />
        {isLoading ? <h3>Loading...</h3> : (isLoggedIn ? <Main /> : <Login />)}
        <Footer />
    </div>
  )
}

export default App;
