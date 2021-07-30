import React, { useEffect } from "react";

import Header from "./main/Header";
import Sidebar from "./main/Sidebar";

export default function Base({ children }) {
  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      {children}
    </div>
  );
}
