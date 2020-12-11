import './App.css';
import { React } from 'react';
import SearchPlayer from "./search_player";

function App() {
  const reload = () => {
    window.location.reload();
  }

  return (
    <div className="App">
      <div class="snowflakes" aria-hidden="true">
        <div class="snowflake">
          ❅
  </div>
        <div class="snowflake">
          ❅
  </div>
        <div class="snowflake">
          ❆
  </div>
        <div class="snowflake">
          ❄
  </div>
        <div class="snowflake">
          ❅
  </div>
        <div class="snowflake">
          ❆
  </div>
        <div class="snowflake">
          ❄
  </div>
        <div class="snowflake">
          ❅
  </div>
        <div class="snowflake">
          ❆
  </div>
        <div class="snowflake">
          ❄
  </div>
      </div>
      <div className="header">
        <h1 onClick={() => reload()}>Fortnite Analytics</h1>
      </div>
      <SearchPlayer />
    </div>
  );
}

export default App;
