import { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Main from './Components/Main';
import NewProject from './Components/NewProject';
import ProjectList from './Components/ProjectList';
import About from "./Components/About";
import Error from "./Components/Error";
import Footer from "./Components/Footer";

function App() {
    const [projects, setProjects] = useState([]);  
    const getProjects = () => {
      fetch("../data.json")
        .then((res) => res.json())
        .then((data) => setProjects(data));
    };

    useEffect(() => getProjects(), []);
  
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Switch>
        <Route path="/projects/new">
          <NewProject />
        </Route>
        <Route path="/projects">
          <ProjectList projects = { projects } />
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