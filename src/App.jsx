import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import CareerTest from "./components/CareerTest/CareerTest";
import Header from "./components/Header/Header";
import QuizOptions from "./components/QuizOptions/QuizOptions";
import DemoCareerTest from "./components/CareerTest/DemoCareerTest";
import JobSearch from "./components/JobSearch/JobSearch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<QuizOptions />} />
          <Route path="/career-quiz" element={<CareerTest />} />
          <Route path="/quick-career-quiz" element={<DemoCareerTest />} />
          <Route path="/job-search" element={<JobSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
