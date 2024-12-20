import React, { FC } from "react";
import { Card } from "antd";
import "./styles.css"; // Import the CSS for styling
import BeButton from "components/Button";

export interface HoverableCardProps {
  title: string;
}

const HoverableCard: FC<HoverableCardProps> = ({ title }) => {
  const handlePractice = () => {
  };
  const handleExam = () => {};
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3> {title}</h3>
          <p className="hover-text">Hover me!</p>
        </div>
        <div className="flip-card-back">
          <BeButton onClick={handlePractice}> Practice</BeButton>
          <BeButton onClick={handleExam}> Take Exam</BeButton>
        </div>
      </div>
    </div>
  );
};

export default HoverableCard;
