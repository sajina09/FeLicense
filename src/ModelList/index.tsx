import React from "react";
import { Button, Card, List } from "antd";
import BeButton from "components/Button";
import { ModelSet } from "types";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";

interface ModelListIProps {
  modelSet: ModelSet[];
}

const ModelList: React.FC<ModelListIProps> = ({ modelSet }) => {
  const navigate = useNavigate();

  const handlePractice = (modelsetId: number, modelName: string) => {
    const fieldName = modelName.split(" (")[0];
    const extractedName = fieldName.replace(/\s+/g, "-");

    navigate(`/${extractedName}/${modelsetId}`);
  };

  const handleExam = () => {};

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={modelSet}
      renderItem={(item) => (
        <List.Item>
          <Card title={item?.set_name}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <BeButton
                onClick={() => handlePractice(item?.id, item?.set_name)}
              >
                Practice
              </BeButton>
              <BeButton onClick={handleExam}> Take Exam</BeButton>
              <Button
                title="Download model set"
                shape="round"
                icon={<DownloadOutlined />}
                // size={"small"}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ModelList;
