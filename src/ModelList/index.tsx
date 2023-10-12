import React, { useEffect, useState } from "react";
import { Button, Card, Input, List } from "antd";
import BeButton from "components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { ModelSet } from "types";
import { setCurrentModelSet } from "redux/subjectSlice";
import useModal from "hooks/useModal";
import CustomizedModal from "components/CutomizedModalSet";
import "./styles.css";

const ModelList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { allModelSetList, modelSetList, isModelSetLoading } = useAppSelector(
    (state) => state.subjects
  );

  const { hideModal, showModal, visible } = useModal();

  const currentPath = location.pathname;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [navigateURL, setNavigateURL] = useState("");
  const [filteredFields, setFilteredFields] = useState<ModelSet[]>([]);

  useEffect(() => {
    // Filter fields based on the search query
    const filtered = (
      currentPath === "/all-model-questions"
        ? allModelSetList
        : modelSetList || []
    )?.filter((modelSet) =>
      modelSet.set_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFields(filtered || []); // Initialize as an empty array if filtered is undefined
  }, [currentPath, allModelSetList, searchQuery, modelSetList]);

  const handlePractice = (modelSetId: number, modelName: string) => {
    showModal();
    const fieldName = modelName.split(" (")[0];
    const extractedName = fieldName.replace(/\s+/g, "-");
    setNavigateURL(`/${extractedName}/${modelSetId}`);
  };
  const handleTakeExam = (modelSetId: number, modelName: string) => {
    const fieldName = modelName.split(" (")[0];
    const extractedName = fieldName.replace(/\s+/g, "-");

    navigate(`/${extractedName}/${modelSetId}`, {
      state: { isTimedExam: true },
    });
    dispatch(setCurrentModelSet(extractedName));
  };

  const handleDownloadSet = (modelSetLink: string = "") => {
    window.open(modelSetLink, "_blank");
  };

  return (
    <>
      {" "}
      <div className="section">
        <h1
          className="section-title"
          style={{
            background: "linear-gradient(45deg, #a5d3d9, #fafaf8)",
            borderRadius: "15px",
            padding: "5px 10px",
            marginBottom: "1rem",
          }}
        >
          Available Model Questions
        </h1>
      </div>
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
              title={
                <p className="subject-name" title={item?.set_name}>
                  {item?.set_name}
                </p>
              }
              // cover={
              //   <img
              //     alt="example"
              //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              //   />
              // }
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
                  onClick={() => handleTakeExam(item?.id, item?.set_name)}
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
      {visible && (
        <CustomizedModal
          visible={visible}
          hideModal={hideModal}
          navigateURL={navigateURL}
        />
      )}
    </>
  );
};

export default ModelList;
