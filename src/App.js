import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="wrapper">
        <h1 className="title">
          Memory game
        </h1>
        <select className="players-list" name="players">
          <option value="" disabled selected>Select player</option>
          <option value="mile">Mile</option>
          <option value="cile">Cile</option>
          <option value="pile">Pile</option>
          <option value="kile">Kile</option>
          <option value="new">New...</option>
        </select>
        <input className="new-player" type="text" placeholder="Enter player name"></input>
        <button className="start-button">Start</button>
      </div>
    </div>
  );
}

export default App;
