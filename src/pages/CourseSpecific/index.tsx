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
  }, [subjectName, dispatch]);

  const subjectNameToDisplay = subjectName?.replace(/-/g, " ");

  const dummyImage =
    "https://media.istockphoto.com/id/1322517295/photo/cyber-security-it-engineer-working-on-protecting-network-against-cyberattack-from-hackers-on.jpg?s=1024x1024&w=is&k=20&c=khzPFuAhehJz0IH8_miYkL4_-Zi4IPBF2pfLBtKE4k0=";

  return (
    <div className="course-specific-container">
      <Helmet>
        <title>{subjectNameToDisplay}</title>
        <meta
          name="description"
          content="Subjects for NEC engineering license of IT."
        />
        <link rel="canonical" href="/subjectName" />
      </Helmet>

      <div className="course-specific-name" style={{ width: "600px" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "60%", //TODO : Fix height in big screen
            backgroundImage: `url(${dummyImage})`,
            backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            filter: "blur(2px)",
          }}
        ></div>
        <div
          style={{
            marginTop: "50%",
            marginLeft: "10rem",
            marginBottom: "5rem",
          }}
        >
          <Ticket
            title={<>{subjectName}</>}
            description="A detailed, reliable view of your IT knowledge in a quick convenient format."
          />
        </div>
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
