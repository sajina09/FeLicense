import React, { useEffect } from "react";
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

      <ModelList />
      <ChooseCourse />
    </div>
  );
};

export default AllModelQuestions;
