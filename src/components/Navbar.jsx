import Greetings from './Greetings';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-center bg-amber-900 px-6 py-3 shadow-lg rounded-xl">
      <div className="text-white font-semibold text-lg">
        <Greetings />
      </div>

      <div className="flex gap-4">
        <button onClick={() => setActiveTab("tasks")} className={`px-5 py-2 rounded-full transition-all duration-200 text-sm
            ${activeTab === "tasks" ? "bg-amber-200 text-amber-900 font-bold shadow-md": "bg-transparent border border-amber-200 text-amber-200 hover:bg-amber-800" }`}>
          Tasks
        </button>

        <button onClick={() => setActiveTab("whiteboard")} className={`px-5 py-2 rounded-full transition-all duration-400 text-sm
            ${activeTab === "whiteboard"? "bg-amber-200 text-amber-900 font-bold shadow-md" : "bg-transparent border border-amber-200 text-amber-200 hover:bg-amber-800"}`}>
          Sketch Pad
        </button>
      </div>
    </div>
  );
};

export default Navbar;
