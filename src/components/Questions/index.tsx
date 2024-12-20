import { FC, useEffect, useState } from "react";
import { Button, Card, Collapse, Radio, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchSingleModelSet } from "redux/subjectSlice";
import { useParams } from "react-router-dom";
import "./styles.css";
import CountdownTimer from "components/Timer";

export type IQuestionProps = {
  isTimedExam?: boolean; // Difference between exam and practice questions
};

const QuestionComponent: FC<IQuestionProps> = ({ isTimedExam }) => {
  const dispatch = useAppDispatch();
  const { id: modelSetId } = useParams();

  const { singleModelSet, isSingleModelSetLoading } = useAppSelector(
    (state) => state.subjects
  );

  useEffect(() => {
    dispatch(fetchSingleModelSet({ modelsetId: modelSetId as string }));
    setQuestions(singleModelSet?.questions);
    // dispatch(
    //   fetchCustomizedModelSet({
    //     modelSetId: modelSetId as string,
    //     numGroupA: 3,
    //     numGroupB: 3,
    //     shuffleQuestions: false,
    //   })
    // );
  }, []);

  const [questions, setQuestions] = useState(singleModelSet?.questions);

  const groupAQuestions = questions?.filter(
    (question) => question.group === "a"
  );
  const groupBQuestions = questions?.filter(
    (question) => question.group === "b"
  );
  const modelSetName = singleModelSet?.set_name;

  const handleAnswerChange = (selectedOption: string, index: number) => {
    setTimeout(() => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          userAnswered: selectedOption,
        };
        return updatedQuestions;
      });
    }, 50);
  };

  const handleCollapse = (index: number) => {
    setTimeout(() => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          isCollapseOpen: !updatedQuestions[index]?.isCollapseOpen ?? true,
          userAnswered: updatedQuestions[index]?.correct_answer,
        };
        return updatedQuestions;
      });
    }, 50);
  };

  const seeResult = () => {
    let result = 0;
    let attemptedQuestion = 0;
    questions?.forEach((question) => {
      if (question.correct_answer === question.userAnswered) {
        result += 1;
      }
      if (question.userAnswered) {
        attemptedQuestion += 1;
      }
    });
    console.log("result", result, attemptedQuestion);
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

      <div className="group-division">
        {" "}
        <div> Group A : {groupAQuestions?.length}</div>
        <div>Group B : {groupBQuestions?.length} </div>
      </div>

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
        const userAnswer = question?.userAnswered;
        const isCorrect = question?.userAnswered === question?.correct_answer;

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
              onChange={(e) => handleAnswerChange(e.target.value, index)}
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
              onChange={() => handleCollapse(index)}
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
      <div style={{ float: "right", margin: "1rem 10px 10px 0" }}>
        <Button onClick={() => seeResult()}> See results</Button>
      </div>
    </div>
  );
};

export default QuestionComponent;
