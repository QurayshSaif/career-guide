import { BrowserRouter, Route, Routes } from "react-router-dom";
import CareerTest from "./components/CareerTest/CareerTest";

function App() {
  return (
    <div className="App">
      <h1>Career Guide</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CareerTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
