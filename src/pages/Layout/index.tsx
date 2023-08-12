import Navbar from "components/NavBar";
import React, { ReactNode } from "react";
import ".styles.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
