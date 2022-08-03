import React from "react";
import {
    Route,
    Routes
  } from "react-router-dom";

import Home from "../home";
import Login from "../login";
import NetworkInfo from "../network";
import MemoryInfo from "../memory";
import CpuInfo from "../cpu";
import DiskInfo from "../disk";
import SystemInfo from "../system";
import Reports from "../reports";

export default function ThisAppsRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/network_info" element={<NetworkInfo/>}/>
          <Route path="/memory_info" element={<MemoryInfo/>}/>
          <Route path="/cpu_info" element={<CpuInfo/>}/>
          <Route path="/disk_info" element={<DiskInfo/>}/>
          <Route path="/system_info" element={<SystemInfo/>}/>
        </Routes>
    );
}
