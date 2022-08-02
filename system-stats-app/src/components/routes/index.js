import React from "react";
import {
    Route,
    Routes
  } from "react-router-dom";

import Home from "../home";
import Login from "../login";
import NetworkInfo from "../network";

export default function ThisAppsRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/network_info" element={<NetworkInfo/>}/>
        </Routes>
    );
}
