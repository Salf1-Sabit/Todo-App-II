import "bootstrap/dist/css/bootstrap.min.css";

// NavBar Navigations
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import Registration from "./pages/Registration";
import Users from "./pages/admin/right-side/Users";
import MonitorTasks from "./pages/admin/right-side/MonitorTasks";
import Analytics from "./pages/admin/right-side/Analytics";
import Feedback from "./pages/admin/right-side/Feedback";
import Help from "./pages/admin/right-side/Help";
import Settings from "./pages/admin/right-side/Settings";

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
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/monitor-tasks" element={<MonitorTasks />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/feedback" element={<Feedback />} />
          <Route path="/admin/help" element={<Help />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
