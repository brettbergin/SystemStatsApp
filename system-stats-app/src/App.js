import React from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import ThisAppsRoutes from "./components/routes";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/network_info">NetworkInfo</Link></li>
            <li><Link to="/memory_info">MemoryInfo</Link></li>
            <li><Link to="/cpu_info">CpuInfo</Link></li>
            <li><Link to="/disk_info">DiskInfo</Link></li>
            <li><Link to="/system_info">SystemInfo</Link></li>
          </ul>
        </nav>
      </div>
      <ThisAppsRoutes />
    </Router>
  );
}




