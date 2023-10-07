import { useEffect, useState } from "react";
import { Button, Card, Collapse, Radio, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "hooks/useApp";
import { fetchSingleModelSet } from "redux/subjectSlice";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";
import CountdownTimer from "components/Timer";
import useModal from "hooks/useModal";
import ResultModal from "components/ResultModal";

export type IQuestionProps = {
  isTimedExam?: boolean; // Difference between exam and practice questions
};

const QuestionComponent = () => {
  const dispatch = useAppDispatch();
  const { id: modelSetId } = useParams();
  const location = useLocation();
  const { hideModal, showModal, visible } = useModal();
  const isTimedExam = location.state?.isTimedExam || false;

  const queryParams = new URLSearchParams(location.search);

  // Access query parameters
  const groupACount = queryParams.get("a_count") || "";
  const groupBCount = queryParams.get("b_count") || "";

  console.log("groupAC", groupACount, groupBCount);

  const { singleModelSet, isSingleModelSetLoading } = useAppSelector(
    (state) => state.subjects
  );

  useEffect(() => {
    dispatch(
      fetchSingleModelSet({
        modelsetId: modelSetId as string,
        groupACount,
        groupBCount,
      })
    )
      .then((response: any) => {
        setQuestions(response?.payload?.questions);
      })
      .catch(() => {
        //
      });
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
  const [attemptedQuestion, setAttemptedQuestion] = useState(0);
  let result = 0;

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

    const attemptedQuestionsCount = questions?.reduce((count, question) => {
      if (question.userAnswered) {
        count += 1;
        if (question.correct_answer === question.userAnswered) {
          result += 1;
        }
      }
      return count;
    }, 0);

    setAttemptedQuestion(attemptedQuestionsCount);
  };

  const handleCollapse = (index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        isCollapseOpen: !updatedQuestions[index]?.isCollapseOpen ?? true,
        userAnswered: updatedQuestions[index]?.correct_answer,
      };
      return updatedQuestions;
    });
  };

  const seeResult = () => {
    showModal();
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
          <div className="timer">
            Time Left
            {/* <CountdownTimer durationInMinutes={120} /> */}
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
              {["A", "B", "C", "D"].map((option) => {
                let backgroundColor = "white";
                let frontColor = "black";

                if (!isTimedExam && userAnswer && option === userAnswer) {
                  if (isCorrect) {
                    backgroundColor = "#daedd1";
                    frontColor = "green";
                  } else {
                    backgroundColor = "#f5dada";
                    frontColor = "red";
                  }
                }
                return (
                  <Radio
                    key={option}
                    value={option}
                    style={{
                      color: frontColor,
                    }}
                  >
                    <p
                      style={{
                        borderRadius: "8px",
                        lineHeight: "0px",
                        padding: "1px 8px",
                        backgroundColor: backgroundColor,
                      }}
                      dangerouslySetInnerHTML={{ __html: question[option] }}
                      className="custom-paragraph"
                    />
                  </Radio>
                );
              })}
            </Radio.Group>
            {!isTimedExam && (
              <Collapse
                style={{ marginTop: "10px" }}
                onChange={() => handleCollapse(index)}
                items={[
                  {
                    key: "1",
                    label: "Answer",
                    children: (
                      <div
                        className="collapse-answer"
                        dangerouslySetInnerHTML={{
                          __html: question.explanation,
                        }}
                      />
                    ),
                    // extra: <div>Similar questions</div>,
                  },
                ]}
              />
            )}
          </Card>
        );
      })}
      <div style={{ float: "right", margin: "1rem 10px 10px 0" }}>
        <Button onClick={() => seeResult()}>
          {!isTimedExam ? "See Results" : "Submit"}{" "}
        </Button>
      </div>
      {visible && (
        <ResultModal
          visible={visible}
          hideModal={hideModal}
          navigateURL={"navigateURL"}
          total={questions?.length}
          score={result}
          attempted={attemptedQuestion}
        />
      )}
    </div>
  );
};

export default QuestionComponent;
