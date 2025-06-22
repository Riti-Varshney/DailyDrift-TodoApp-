import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TaskComponent from './components/TaskComponent'
import Whiteboard from './components/Whiteboard'
function App() {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="container mx-auto p-4">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "tasks" && <TaskComponent />}
      {activeTab === "whiteboard" && <Whiteboard />}
    </div>
  );
}

export default App
