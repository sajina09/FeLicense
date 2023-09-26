import React, { useEffect, useState } from "react";
import { Row, Col, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchSubjects, Subject } from "redux/subjectSlice";

interface ChooseCourseProps {
  showAll?: boolean;
}

const ChooseCourse: React.FC<ChooseCourseProps> = ({ showAll = false }) => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.subjects);

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
              navigateToField(field?.subject_name);
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

  const navigateToField = (id: string) => {
    const fieldName = id.replace(/\s+/g, "-");
    navigate(`/${fieldName}`);
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
        <div className="fields-container">{renderEngineeringFields()}</div>
      </div>
    </>
  );
};

export default ChooseCourse;
