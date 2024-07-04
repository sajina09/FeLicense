import React, { useEffect, useState } from "react";
import { Row, Col, Button, Input, List, Card, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchSubjects, setCurrentSubject, Subject } from "redux/subjectSlice";
import { DownloadOutlined } from "@ant-design/icons";
import logo from "assets/logo.png";

interface ChooseCourseProps {
  showAll?: boolean;
}

const ChooseCourse: React.FC<ChooseCourseProps> = ({ showAll = false }) => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.subjects);

  const isFieldsFetched = fields?.length > 0;

  const navigate = useNavigate();

  // State for the search query and filtered fields
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFields, setFilteredFields] = useState<Subject[]>([]);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  useEffect(() => {
    // Filter fields based on the search query
    const filtered = (fields || [])?.filter((field) =>
      field.subject_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFields(filtered || []); // Initialize as an empty array if filtered is undefined
  }, [searchQuery, fields]);

  const renderEngineeringFields = () => {
    const showNumber = showAll ? filteredFields?.length : 6;
    return (
      <>
        {filteredFields?.slice(0, showNumber).map((field, index) => (
          <Button
            key={index}
            className="field-btn"
            title={field?.subject_name}
            onClick={() => {
              navigateToField(field?.subject_name, Number(field?.id));
            }}
          >
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {field.subject_name}
            </div>
          </Button>
        ))}
      </>
    );
  };

  const handleDownloadSet = (event: any, modelSetLink: string = "") => {
    event.stopPropagation();
    window.open(modelSetLink, "_blank");
  };

  const navigateToField = (name: string, subjectId: number) => {
    const fieldName = name.replace(/\s+/g, "-");
    dispatch(setCurrentSubject(fieldName));
    navigate(`/${fieldName}`, { state: { subjectId } });
  };
  return (
    <>
      {showAll && (
        <div className="heading-container">
          <h3 className="section-title-course">Choose your desired Program!</h3>
          <div className="search-input">
            <Input
              placeholder="Search your Engineering field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </div>
        </div>
      )}
      <div className="choose-course">
        {!showAll && (
          <div className="section-course">
            <Row>
              <Col>
                <h1 className="section-title-course">
                  Choose your desired Program!
                </h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="section-content">Please select one</p>
              </Col>
            </Row>
            <Button
              className="see-more-btn"
              type="link"
              onClick={() => {
                navigate("/all-fields");
              }}
            >
              See all courses
            </Button>
          </div>
        )}
        {!showAll? (
          <div className="fields-container">{renderEngineeringFields()}</div>
        ) : (
          <List
            style={{ width: "90%", margin: "auto" }}
            // loading={isModelSetLoading}
            grid={{ gutter: 16, column: 3 }}
            dataSource={filteredFields}
            renderItem={(item) => (
              <List.Item>
                <Card
                  // loading={isModelSetLoading}
                  title={<p title={item?.subject_name}>{item?.subject_name}</p>}
                  cover={
                    <div style={{ height: "200px", overflow: "hidden" }}>
                      <img
                        alt="Engineering"
                        src={item?.picture_link ?? logo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  }
                  onClick={() => {
                    navigateToField(item?.subject_name, Number(item?.id));
                  }}
                  style={{ cursor: "pointer" }}
                  className="hover-card"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Tooltip title="Download Syllabus">
                      <Button
                        title="Download syllabus"
                        shape="round"
                        icon={<DownloadOutlined />}
                        onClick={(event) =>
                          handleDownloadSet(event, item.subject_link)
                        }
                      />
                    </Tooltip>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
};

export default ChooseCourse;
