import './App.css';
import { React } from 'react';
import SearchPlayer from "./search_player";

function App() {
  const reload = () => {
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="header">
        <h1 onClick={() => reload()}>Fort Analytics</h1>
      </div>
      <SearchPlayer />
    </div>
  );
}

export default App;
