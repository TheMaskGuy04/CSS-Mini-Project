import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Rsa from "./components/RSA";
import Diffie from "./components/Diffie";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>CSS Mini Project</h1>
        <div className="choice">
          <Link to="/rsa" className="button-link">
            <button className="button">RSA</button>
          </Link>

          <Link to="/diffie" className="button-link">
            <button className="button">Diffie</button>
          </Link>
        </div>

        <Routes>
          <Route path="/rsa" element={<Rsa />} />
          <Route path="/diffie" element={<Diffie />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
