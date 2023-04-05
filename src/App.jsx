import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import CareerTest from "./components/CareerTest/CareerTest";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CareerTest />} />
          <Route path="/career-quiz" element={<CareerTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
