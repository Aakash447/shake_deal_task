import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="input-group">
        <label for="task">Enter task:</label>
        <input type="textarea" id="task" className="input_textarea" />
      </div>

      <div className="input-group">
        <label for="cars">Select a team:</label>

        <select name="team" id="team">
          <option value="">Select a team</option>
        </select>
      </div>
    </div>
  );
}

export default App;
