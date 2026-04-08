import { useState } from "react";
import App1 from "./App1";
import App2 from "./App2";

function App() {
  const [menu, setMenu] = useState("app1");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>React SPA menü</h1>

      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setMenu("app1")} style={{ marginRight: "10px" }}>
          To-do lista
        </button>
        <button onClick={() => setMenu("app2")}>
          Tic-Tac-Toe
        </button>
      </nav>

      <hr />

      <div style={{ marginTop: "20px" }}>
        {menu === "app1" && <App1 />}
        {menu === "app2" && <App2 />}
      </div>
    </div>
  );
}

export default App;