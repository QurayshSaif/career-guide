import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import CareerTest from "./components/CareerTest/CareerTest";
import Header from "./components/Header/Header";
import QuizOptions from "./components/QuizOptions/QuizOptions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<QuizOptions />} />
          <Route path="/career-quiz" element={<CareerTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
