import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState('');

  const addTask = () => {
    if (value.trim()) {
      setTasks([...tasks, { text: value, important: false }]);
      setValue('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const markImportant = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, important: !task.important } : task
    );
    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> 
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Список задач</h1>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Новая задача"
                />
                <button onClick={addTask}>Добавить</button>
                <ul>
                  {tasks.map((task, index) => (
                    <li key={index} className={task.important ? 'important' : ''}>
                      {task.text}
                      <button onClick={() => markImportant(index)}>!</button>
                      <button onClick={() => deleteTask(index)}>x</button>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
          <Route path="/about" element={<h2>About this app</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
