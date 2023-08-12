import React, { ReactNode } from "react";
import { Card } from "antd";
import "./styles.css";
import BeButton from "components/Button";

const { Meta } = Card;

interface TicketProps {
  title: string | ReactNode;
  description: string;
  button?: string;
  children?: ReactNode;
}

const Ticket: React.FC<TicketProps> = ({
  title,
  description,
  button,
  children,
}) => {
  return (
    <Card className="ticket" bordered={false}>
      <Meta title={title} />
      <div className="ticket-description">{description}</div>
      {children}
      {button && <BeButton>{button}</BeButton>}
    </Card>
  );
};

export default Ticket;
