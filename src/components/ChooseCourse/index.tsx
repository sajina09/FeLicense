import React, { useEffect } from "react";
import { Row, Col, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchSubjects } from "redux/subjectSlice";

interface ChooseCourseProps {
  showAll?: boolean;
}

const ChooseCourse: React.FC<ChooseCourseProps> = ({ showAll = false }) => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.subjects);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const renderEngineeringFields = () => {
    const showNumber = showAll ? fields?.length : 6;
    return (
      <>
        {fields?.slice(0, showNumber).map((field, index) => (
          <Button
            key={index}
            className="field-btn"
            title={field.subject_name}
            onClick={() => {
              navigateToField(field.subject_name);
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
    const formattedId = id.replace(/\s+/g, "-");
    navigate(`/${formattedId}`);
  };

  return (
    <div className="choose-course">
      <div className="section-course">
        <Row>
          <Col>
            <h1 className="section-title-course">
              {" "}
              Choose your desired Program!
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="section-content">Please select one</p>
          </Col>
        </Row>
        <Button className="see-more-btn" type="link">
          <Link to="/all-fields">See all courses</Link>
        </Button>
      </div>

      <div className="fields-container">{renderEngineeringFields()}</div>
    </div>
  );
};

export default ChooseCourse;
