
import "./App.css";
import List from "./Pages/List";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobDetail from "./components/JobDetail";
import Detail from "./Pages/Detail";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/jobDetail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;