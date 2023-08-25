import "bootstrap/dist/css/bootstrap.min.css";

// NavBar Navigations
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Sidebar from "./pages/admin/global/Sidebar";
import Registration from "./pages/Registration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
