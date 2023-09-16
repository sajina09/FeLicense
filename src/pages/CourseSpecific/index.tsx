import React, { useEffect } from "react";
import { Col, Row } from "antd";
import Ticket from "components/Ticket";
import "./styles.css";
import ChooseCourse from "components/ChooseCourse";

import ModelList from "ModelList";
import { Helmet } from "react-helmet-async";
import { useAppDispatch } from "hooks/useApp";
import { fetchModelSet } from "redux/subjectSlice";
import { useParams } from "react-router-dom";

const CourseSpecific: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name: subjectName } = useParams();

  useEffect(() => {
    dispatch(fetchModelSet({ subjectSlug: subjectName || "" }));
  }, []);

  return (
    <div className="course-specific-container">
      <Helmet>
        <title>{subjectName}</title>
        <meta
          name="description"
          content="Subjects for nec engineering license of IT."
        />
        <link rel="canonical" href="/subjectName" />
      </Helmet>
      <div className="course-specific-name" style={{ width: "400px" }}>
        <Ticket
          title={<>{subjectName}</>}
          description="A detailed, reliable view of your IT knowledge in a quick convenient format."
        />
      </div>

      <div className="section">
        <Row>
          <Col>
            <h1 className="section-title">Available Model Questions</h1>
          </Col>
        </Row>
      </div>
      <ModelList />
      <ChooseCourse />
    </div>
  );
};

export default CourseSpecific;
