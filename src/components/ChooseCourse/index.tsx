import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";

interface ChooseCourseProps {
  showAll?: boolean;
}
interface Field {
  label: string;
  path: string;
}

const ChooseCourse: React.FC<ChooseCourseProps> = ({ showAll = false }) => {
  const fields: Field[] = [
    {
      label: "IT",
      path: "/it-engineering",
    },
    {
      label: "Computer",
      path: "/computer-engineering",
    },
    {
      label: "Electrical",
      path: "/electrical-engineering",
    },
    {
      label: "Civil",
      path: "/civil-engineering",
    },
    {
      label: "Electronics",
      path: "electronics-engineering",
    },
    {
      label: "Architectural",
      path: "/architectural-engineering",
    },
    {
      label: "Bio-Medical",
      path: "/bio-medical-engineering",
    },

    // Add more fields here
  ];

  const renderEngineeringFields = () => {
    const showNumber = showAll ? fields?.length : 6;
    return (
      <>
        {fields.slice(0, showNumber).map((field, index) => (
          <Button key={index} className="field-btn">
            <Link to={field.path}>
              {field.label} <br></br>
              Engineering
            </Link>
          </Button>
        ))}
      </>
    );
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
