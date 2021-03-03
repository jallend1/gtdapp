import { Switch, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Main from './Components/Main'
import Projects from './Components/Projects';
import About from "./Components/About";
import Error from "./Components/Error";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Switch>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Main />
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
