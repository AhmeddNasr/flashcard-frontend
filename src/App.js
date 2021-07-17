import './App.css';
import Navigation from "./Navigation";
function App() {
  return (
    <div className="App">
      <div id="banner">
        <Navigation />
        <div id="showcase">
          <h1>never worry about forgetting again</h1>
          <p id="slogan">100% free forever</p>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default App;
