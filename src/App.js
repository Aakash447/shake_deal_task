import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
const apiUrl = "http://localhost:8000/";

function App() {
  const [task, setTask] = useState({
    task: "",
    teamId: "",
  });
  const [assignedTo, setAssignedTo] = useState({});
  const [teams, setTeams] = useState([]);
  console.log("task:", task);

  const addTask = async () => {
    if (task.task && task.teamId) {
      try {
        const payload = {
          task: task.task,
          teamId: task.teamId,
        };
        const path = "task/addTask";
        const res = await axios.post(apiUrl + path, payload);
        setAssignedTo(res.data.assignedToEmployee);
        setTask({ task: "", teamId: "" });
      } catch (error) {
        console.error("error:", error);
      }
    } else {
      alert("Please fill the task and team");
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const getTeams = async () => {
    try {
      const path = "task/teams";

      const res = await axios.get(apiUrl + path);
      setTeams(res.data.teams);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="App">
      <div className="input-group">
        <label htmlFor="task">Enter task:</label>
        <input
          type="textarea"
          id="task"
          className="input_textarea"
          name="task"
          placeholder="Enter task"
          onChange={handleChange}
          value={task.task}
        />
      </div>
      <div className="input-group">
        <label htmlFor="cars">Select a team:</label>

        <select
          name="teamId"
          id="team"
          onChange={handleChange}
          value={task.teamId}
        >
          <option value="">Select a team</option>
          {teams?.map((item, i) => {
            return <option value={item?._id}>{item?.name}</option>;
          })}
        </select>
      </div>
      <div className="input-group">
        <button onClick={addTask}>Add</button>
      </div>
      {assignedTo?.name && (
        <section>
          <div>Assigned To: {assignedTo?.name}</div>
          <div style={{ marginTop:'10px' }} >position : {assignedTo?.position}</div>
        </section>
      )}
    </div>
  );
}

export default App;
