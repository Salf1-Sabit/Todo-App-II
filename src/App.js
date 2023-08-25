import "bootstrap/dist/css/bootstrap.min.css";

// NavBar Navigations
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Registration from "./pages/Registration";

// Admin Navigations
// import Dashboard from "./pages/admin/scenes/Dashboard";
// import UserManagement from "./pages/admin/scenes/UserManagement";
// import TaskMonitoring from "./pages/admin/scenes/TaskMonitoring";
// import Analytics from "./pages/admin/scenes/Analytics";
// import Feedback from "./pages/admin/scenes/Feedback";

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
          {/* <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/task-monitoring" element={<TaskMonitoring />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/feedback" element={<Feedback />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
