import React from "react";
import { Button, ButtonProps } from "antd";
import "./styles.css";

const BeButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      className="custom-button"
      {...props}
    >
      {children}
    </Button>
  );
};

export default BeButton;
