import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatchList from "./components/CatchList";
import CatchDetail from "./components/CatchDetail";
import CatchEdit from "./components/CatchEdit";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatchList />} />
        <Route path="/catch/:id" element={<CatchDetail />} />
        <Route path="/catch/:id/edit" element={<CatchEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
