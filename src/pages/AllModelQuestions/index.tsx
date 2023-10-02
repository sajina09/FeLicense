import React, { useEffect } from "react";
import { Col, Row } from "antd";
import ChooseCourse from "components/ChooseCourse";

import ModelList from "ModelList";
import { Helmet } from "react-helmet-async";
import { useAppDispatch } from "hooks/useApp";
import { fetchModelSet } from "redux/subjectSlice";
import { useParams } from "react-router-dom";

const AllModelQuestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name: subjectName } = useParams();

  useEffect(() => {
    dispatch(fetchModelSet({ subjectSlug: subjectName || "" }));
  }, [subjectName, dispatch]);


  return (
    <div className="course-specific-container">
      <Helmet>
        <meta
          name="description"
          content="Subjects for NEC engineering license of IT."
        />
        <link rel="canonical" href="/subjectName" />
      </Helmet>

      <div className="course-specific-name" style={{ width: "600px" }}>
        <div
          style={{
            marginLeft: "10rem",
            marginBottom: "5rem",
          }}
        ></div>
      </div>

      <div className="section" style={{ width: "100%" }}>
        <Row>
          <Col>
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
          </Col>
        </Row>
       
      </div>
      <ModelList />
      <ChooseCourse />
    </div>
  );
};

export default AllModelQuestions;
