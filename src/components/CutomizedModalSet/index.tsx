import { Button, Form, InputNumber, Modal } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  navigateURL: string;
}

const CustomizedModal: FC<IProps> = ({ visible, hideModal, navigateURL }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFinish = ({ numberOfGroupA, numberOfGroupB }: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    navigate(
      `${navigateURL}?a_count=${numberOfGroupA}&b_count=${numberOfGroupB}`
    );
    // hideModal();
  };

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
            <Button key="back" onClick={form?.submit}>
              Skip Customization
            </Button>

            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={form?.submit}
            >
              Customize
            </Button>
          </div>
        }
      >
        {/* TODO */}
        <p>
          Choose the number of question you want to appear in your practice test
        </p>
        <Form
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          colon={false}
          initialValues={{
            numberOfGroupA: "60",
            numberOfGroupB: "20",
          }}
        >
          <div className="form-fields">
            <Form.Item label="Number of Group A:" name="numberOfGroupA">
              <InputNumber min={5} max={60} defaultValue={20} />
            </Form.Item>
            <Form.Item label="Number of Group B:" name="numberOfGroupB">
              <InputNumber min={5} max={20} defaultValue={5} />
            </Form.Item>
          </div>
          <p style={{ fontSize: "12px", color: "gray" }}>
            *Note: If max values are chosen for number of groups all questions
            available in the model set are shown.*
          </p>
        </Form>
      </Modal>
    </>
  );
};

export default CustomizedModal;
