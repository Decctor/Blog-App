import React from "react";
import Header from "./Header";
function Layout({ children }) {
  return (
    <div className="mx-16">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
