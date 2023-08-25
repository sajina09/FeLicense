import React from "react";
import { Card, Row, Col } from "antd";
import HoverableCard from "components/HoverableCard";

const gridStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
};

const contentItems = [
  { title: "Model set 1", hoverable: true },
  { title: "Model set 2", hoverable: false },
  // Add more items as needed
];

const AvailableModelQuestion: React.FC = () => {
  const totalItems = contentItems.length;
  let colSpan = 24;

  if (totalItems === 2) {
    colSpan = 12;
  } else if (totalItems === 3) {
    colSpan = 8;
  }

  return (
    <Card style={{ width: "100%" }} title="Available model questions">
      <Row gutter={[16, 16]}>
        {contentItems.map((item, index) => (
          <Col
            key={index}
            xs={24}
            sm={colSpan}
            md={colSpan}
            lg={colSpan}
            style={gridStyle}
          >
            <HoverableCard title={item.title} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default AvailableModelQuestion;
