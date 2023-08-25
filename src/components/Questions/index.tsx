import React, { useEffect, useState } from "react";
import { Card, Collapse, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchModelSet } from "redux/subjectSlice";

export type IQuestionProps = {
  isTimedExam?: boolean; // Difference between exam and practice questions
};

const QuestionComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const { modelset } = useAppSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchModelSet());
  }, []);

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const questions = modelset?.[0]?.questions;
  const modelSetName = modelset?.[0]?.set_name;

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
    <div>
      <h1 style={{ textAlign: "center" }}>{modelSetName}</h1>
      {questions?.map((question: any, index: number) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correct_answer;

        return (
          <Card
            key={question.id}
            title={
              <div
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
                  extra: <div>Similar questions</div>,
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
