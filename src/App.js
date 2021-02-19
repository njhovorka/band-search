import './App.css';
import SearchPage from './SearchPage.js';
import logo from './logo.png'

function App() {
  return (
    <div className="App">
      <a href="https://fan.booster.musicfox.io">
        <img src={ logo } alt="musicfox logo"/>
      </a>
      <SearchPage />
    </div>
  );
}

export default App;
