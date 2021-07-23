import './App.css';
import Navigation from "./Navigation-landing";
// montserrat
function App() {
  return (
    <div className="App">
      <div id="banner">
        <Navigation />
        <div id="showcase">
          <h1>let us remember for you</h1>
          <p id="slogan">100% free forever</p>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default App;
