import './App.css';
import CardList from './CardList';
import TaskManager from './TaskManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <TaskManager />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/cards" element={<CardList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
