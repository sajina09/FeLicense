import React from "react";
import { Card, List } from "antd";
import BeButton from "components/Button";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },    
];

const ModelList: React.FC = () => {
  const handlePractice = () => {
    console.log("hi");
  };
  const handleExam = () => {};

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <BeButton onClick={handlePractice}> Practice</BeButton>
              <BeButton onClick={handleExam}> Take Exam</BeButton>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ModelList;
