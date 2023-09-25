import React from "react";
import { Button, Card, List } from "antd";
import BeButton from "components/Button";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppSelector } from "hooks/useApp";

const ModelList: React.FC = () => {
  const navigate = useNavigate();
  const { modelSetList, isModelSetLoading } = useAppSelector(
    (state) => state.subjects
  );

  const handlePractice = (modelSetId: number, modelName: string) => {
    const fieldName = modelName.split(" (")[0];
    const extractedName = fieldName.replace(/\s+/g, "-");

    navigate(`/${extractedName}/${modelSetId}`);
  };

  const handleDownloadSet = (modelSetLink: string = "") => {
    window.open(modelSetLink, "_blank");
  };

  const handleExam = () => {};

  return (
    <List
      style={{ width: "90%", margin: "auto" }}
      loading={isModelSetLoading}
      grid={{ gutter: 16, column: 3 }}
      dataSource={modelSetList}
      renderItem={(item) => (
        <List.Item>
          <Card loading={isModelSetLoading} title={item?.set_name}>
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
                onClick={() => handleDownloadSet(item.model_set_link)}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ModelList;
