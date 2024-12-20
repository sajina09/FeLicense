import React, { useEffect, useState } from "react";
import { Button, Card, Input, List } from "antd";
import BeButton from "components/Button";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppSelector } from "hooks/useApp";
import { ModelSet } from "types";

const ModelList: React.FC = () => {
  const navigate = useNavigate();
  const { modelSetList, isModelSetLoading } = useAppSelector(
    (state) => state.subjects
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFields, setFilteredFields] = useState<ModelSet[]>([]);

  useEffect(() => {
    // Filter fields based on the search query
    const filtered = (modelSetList || [])?.filter((modelSet) =>
      modelSet.set_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFields(filtered || []); // Initialize as an empty array if filtered is undefined
  }, [searchQuery, modelSetList]);

  const handlePractice = (modelSetId: number, modelName: string) => {
    const fieldName = modelName.split(" (")[0];
    const extractedName = fieldName.replace(/\s+/g, "-");

    navigate(`/${extractedName}/${modelSetId}`);
  };

  const handleDownloadSet = (modelSetLink: string = "") => {
    window.open(modelSetLink, "_blank");
  };

  return (
    <>
      {" "}
      <div style={{ width: "300px", margin: "auto", marginBottom: "1.5rem" }}>
        <Input
          placeholder="Search model set"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </div>
      <List
        style={{ width: "90%", margin: "auto" }}
        loading={isModelSetLoading}
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredFields ?? modelSetList}
        renderItem={(item) => (
          <List.Item>
            <Card
              loading={isModelSetLoading}
              title={<p title={item?.set_name}>{item?.set_name}</p>}
            >
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
                <BeButton
                  onClick={() => handlePractice(item?.id, item?.set_name)}
                >
                  {" "}
                  Take Exam
                </BeButton>
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
    </>
  );
};

export default ModelList;
