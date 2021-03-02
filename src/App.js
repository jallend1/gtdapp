import {Switch, Route} from 'react-router-dom';

import NavBar from './Components/NavBar'

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import NextActions from "./Components/NextActions";
import About from './Components/About';
import Error from './Components/Error';
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <NextActions />
          <Sidebar />
        </Route>
        <Route path="/">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
