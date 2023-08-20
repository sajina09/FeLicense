import React, { useEffect } from "react";
import { Card, Radio } from "antd";
import { ModelSet } from "types"; // Import the correct type for ModelSet
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchModelSet } from "redux/subjectSlice";

interface QuestionComponentProps {
  modelSet: ModelSet;
}

const QuestionComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const { modelset } = useAppSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchModelSet());
  }, []);

  console.log("fetchModelSet", modelset);
  const questions = modelset?.[0]?.questions;

  return (
    <div>
      {/* <h1>{set_name}</h1> */}
      {questions?.map((question: any, index: number) => (
        <Card
          key={question.id}
          title={
            <div
              dangerouslySetInnerHTML={{
                __html: `${index + 1} => ${question.title}`,
              }}
            />
          }
        >
          <Radio.Group
            style={{ display: "flex", flexDirection: "column" }}
            className="vertical-radio-group"
          >
            <Radio value="A">
              {" "}
              <p dangerouslySetInnerHTML={{ __html: question.A }}></p>{" "}
            </Radio>
            <Radio value="B">
              {" "}
              <p dangerouslySetInnerHTML={{ __html: question.B }}></p>{" "}
            </Radio>
            <Radio value="C">
              {" "}
              <p dangerouslySetInnerHTML={{ __html: question.C }}></p>{" "}
            </Radio>
            <Radio value="D">
              {" "}
              <p dangerouslySetInnerHTML={{ __html: question.D }}></p>{" "}
            </Radio>
          </Radio.Group>
        </Card>
      ))}
    </div>
  );
};

export default QuestionComponent;
