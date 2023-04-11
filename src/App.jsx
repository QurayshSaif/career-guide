import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import CareerTest from "./components/CareerTest/CareerTest";
import Header from "./components/Header/Header";
import QuizOptions from "./components/QuizOptions/QuizOptions";
import JobSearch from "./components/JobSearch/JobSearch";
import QuickCareerTest from "./components/QuickCareerTest/QuickCareerTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<QuizOptions />} />
          <Route path="/career-quiz" element={<CareerTest />} />
          <Route path="/quick-career-quiz" element={<QuickCareerTest />} />
          <Route path="/job-search" element={<JobSearch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
