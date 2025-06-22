import React, { useRef, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { FaSave } from "react-icons/fa";
import { BiSolidImage } from "react-icons/bi";
const Whiteboard = () => {
  const canvasRef = useRef();
  const [isEraser, setIsEraser] = useState(false);

  const saveWhiteboard = async () => {
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("drawing", JSON.stringify(paths));
    alert("✅ Drawing saved!");
  };

 //canvasRef -> canvas ka reference hold krta h //canvasRef.current-> actual component hold krta h
 //exportPath -> cctv -> noticing everything(each nd evry stroke)

  const clearWhiteboard = () => {
    canvasRef.current.clearCanvas();
    localStorage.removeItem("drawing");
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
    canvasRef.current.eraseMode(!isEraser);
  };

  useEffect(() => {
    const saved = localStorage.getItem("drawing");
//read the saved drawing from the browser’s local storage->looks for a key named "drawing".
// If something was saved earlier using localStorage.setItem("drawing", ...)(look niche), it will get that value here as a string.
    if (saved && canvasRef.current) {
      canvasRef.current.loadPaths(JSON.parse(saved));
    }
  }, []);
  return (
    <div className="whiteboard p-4">
      <h2 className="text-xl font-bold mb-2 text-amber-900">🎨Doodle Zone</h2>

      <ReactSketchCanvas ref={canvasRef} style={{ border: "2px solid black", borderRadius: "1px", backgroundColor: "white" }} width="100%" height="300px" strokeWidth={4} strokeColor="black" />
      <div className="mt-3 flex gap-2">

        <button onClick={toggleEraser} className={`${isEraser ? "custom-bgGradient1 text-black font-bold" : "custom-bgGradient2 text-black font-bold"} text-black px-3 py-1 rounded`} >
          {isEraser ? "✏️ Pen Mode" : "🧽 Eraser Mode"}
        </button>

        <button onClick={saveWhiteboard} className="flex custom-bgGradient4 text-black font-bold px-3 py-1 rounded" >
          <div className="relative top-1 mr-1"><FaSave /></div>Save Drawing
        </button>

        <button onClick={clearWhiteboard} className="custom-bgGradient3 text-black font-bold px-3 py-1 rounded ">
          ❌ Clear All
        </button>

        <button onClick={() => {
          const saved = localStorage.getItem("drawing");
          if (saved && canvasRef.current) {
            canvasRef.current.loadPaths(JSON.parse(saved));
            alert("✅ Loaded your last saved drawing!");
          } else {
            alert("😢 No saved drawing found.");
          } }}
          className="custom-bgGradient1 text-black font-bold px-3 py-1 rounded flex">
         <div className="relative top-1 mr-1"><BiSolidImage /></div>Show Last Saved Drawing
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;
