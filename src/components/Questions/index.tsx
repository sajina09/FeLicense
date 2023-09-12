import React, { FC, useEffect, useState } from "react";
import { Card, Collapse, Radio, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchSingleModelSet } from "redux/subjectSlice";
import { useParams } from "react-router-dom";
import "./styles.css";
import CountdownTimer from "components/Timer";
import { fetchCustomizedModelSet } from "redux/modelSet/modelsetSlice";

export type IQuestionProps = {
  isTimedExam?: boolean; // Difference between exam and practice questions
};

const QuestionComponent: FC<IQuestionProps> = ({ isTimedExam }) => {
  const dispatch = useAppDispatch();
  const { id: modelSetId } = useParams();

  const { singleModelSet, isSingleModelSetLoading } = useAppSelector(
    (state) => state.subjects
  );
  const { customizedModelSet } = useAppSelector((state) => state.modelSets);

  useEffect(() => {
    dispatch(fetchSingleModelSet({ modelsetId: modelSetId as string }));
    dispatch(
      fetchCustomizedModelSet({
        modelSetId: modelSetId as string,
        numGroupA: 3,
        numGroupB: 3,
        shuffleQuestions: false,
      })
    );
  }, []);

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const questions = singleModelSet?.questions;
  const modelSetName = singleModelSet?.set_name;

  const handleAnswerChange = (questionId: number, selectedOption: string) => {
    setTimeout(() => {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: selectedOption,
      }));
    }, 100);

    // if (selectedOption !== questions[questionId].correct_answer) {
    //   setTimeout(() => {
    //     setUserAnswers((prevAnswers) => ({
    //       ...prevAnswers,
    //       [questionId]: "black", // Change the text color back to black
    //     }));
    //   }, 3000); // 3 seconds
    // }
  };

  return (
    <div className="model-set-container">
      <h1 style={{ textAlign: "center" }}>
        {modelSetName}{" "}
        <Spin
          style={{ top: "30vh", left: "30vh" }}
          spinning={isSingleModelSetLoading}
        />
      </h1>

      {isTimedExam && (
        <div className="timer-container">
          <div className="group-division">{/* Group A Group B */}</div>
          <div className="timer">
            Time Left
            <CountdownTimer durationInMinutes={120} />
          </div>
        </div>
      )}

      {questions?.map((question: any, index: number) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correct_answer;

        console.log("question", question);

        return (
          <Card
            key={question.id}
            size="small"
            title={
              <div
                style={{ overflow: "visible", whiteSpace: "normal" }}
                dangerouslySetInnerHTML={{
                  __html: `<div style="display: flex; align-items: center;">${
                    index + 1
                  }. &nbsp;${question.title}</div>`,
                }}
              />
            }
          >
            <Radio.Group
              style={{ display: "flex", flexDirection: "column" }}
              className="vertical-radio-group"
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              {["A", "B", "C", "D"].map((option) => (
                <Radio
                  key={option}
                  value={option}
                  style={{
                    color:
                      userAnswer && option === userAnswer
                        ? isCorrect
                          ? "green"
                          : "red"
                        : "black",
                  }}
                >
                  <p
                    style={{
                      borderRadius: "8px",
                      lineHeight: "0px",
                      padding: "1px 8px",
                      backgroundColor:
                        userAnswer && option === userAnswer
                          ? isCorrect
                            ? "#daedd1"
                            : "#f5dada"
                          : "white",
                    }}
                    dangerouslySetInnerHTML={{ __html: question[option] }}
                    className="custom-paragraph"
                  />
                </Radio>
              ))}
            </Radio.Group>
            <Collapse
              style={{ marginTop: "10px" }}
              items={[
                {
                  key: "1",
                  label: "Answer",
                  children: (
                    <div
                      style={{
                        borderRadius: "8px",

                        backgroundColor: "rgb(255 245 231)",
                        padding: "10px",
                        margin: 0,
                      }}
                      dangerouslySetInnerHTML={{ __html: question.explanation }}
                    />
                  ),
                  // extra: <div>Similar questions</div>,
                },
              ]}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default QuestionComponent;
