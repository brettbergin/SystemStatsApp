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
            <li><Link to="/network_info">NetworkInfo</Link></li>
          </ul>
        </nav>
      </div>
      <ThisAppsRoutes />
    </Router>
  );
}




