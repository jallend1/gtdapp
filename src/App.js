import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Sidebar from "./Components/Sidebar";
import NextActions from "./Components/NextActions";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <NextActions />
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;
