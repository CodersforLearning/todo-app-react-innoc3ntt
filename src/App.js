import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-full">
      <header className="App-header">
        <img src={logo} className="h8-w8" alt="logo" />
        <p className="h-8 w-8">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
