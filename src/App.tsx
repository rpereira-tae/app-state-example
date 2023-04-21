import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Button from "./components/Button";

function App() {
  const [counter, setCounter] = useState<number>(0);

  async function add() {
    setCounter(await invoke("calculate", { method: "add" }));
  }

  async function subtract() {
    setCounter(await invoke("calculate", { method: "subtract" }));
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-8">
      <div className="text-6xl text-gray-800 font-bold">
        <span>{counter}</span>
      </div>
      <div className="flex justify-between space-x-4">
        <Button
          className="bg-red-700 text-white hover:bg-red-800 active:bg-red-900 text-4xl font-extrabold"
          onClick={() => subtract()}
        >
          -
        </Button>
        <Button
          className="bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900 text-4xl font-extrabold"
          onClick={() => add()}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default App;
