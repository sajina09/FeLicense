import React, { ReactNode } from "react";
import "./styles.css";

interface SubjectLayoutProps {
  children: ReactNode;
}

const SubjectLayout: React.FC<SubjectLayoutProps> = ({ children }) => {
  return (
    <div className="subject-layout">
      {/* Additional layout content */}
      {children}
    </div>
  );
};

export default SubjectLayout;
