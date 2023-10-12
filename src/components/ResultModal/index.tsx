import { Button, Form, Modal } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  navigateURL: string;
  total: number;
  score: number;
  attempted: number;
}

const ResultModal: FC<IProps> = ({
  visible,
  hideModal,
  navigateURL,
  total,
  score,
  attempted,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFinish = ({ numberOfGroupA, numberOfGroupB }: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // navigate(
    //   `${navigateURL}?a_count=${numberOfGroupA}&b_count=${numberOfGroupB}`
    // );
    // hideModal();
  };

  const percentage = ((Number(score) / Number(total)) * 100).toFixed(2);
  const passed = Number(percentage) >= 50;
  return (
    <>
      <Modal
        title="Customize your Questions"
        onOk={form?.submit}
        open={visible}
        width={"50vw"}
        onCancel={hideModal}
        footer={
          <div className="modal-footer">
            <Button
              key="back"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </Button>

            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={form?.submit}
            >
              Review your answers
            </Button>
          </div>
        }
      >
        {/* TODO */}
        <Form
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          colon={false}
          initialValues={{
            numberOfGroupA: "20",
            numberOfGroupB: "5",
          }}
        >
          <div className="result-container">
            <p className="score-text">You have scored: {score}</p>
            <p className="out-of-text">Out of: {total}</p>
            <p className="out-of-text">Attempted: {attempted}</p>
            <p className="percentage-text">Which is: {percentage}%</p>
            <p className="pass-status-text">
              You have {passed ? "passed" : "failed"}
            </p>
            <p className="emoji-text">
              {passed
                ? "😊 Keep moving forward."
                : "😔 You need to work harder."}{" "}
            </p>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ResultModal;
