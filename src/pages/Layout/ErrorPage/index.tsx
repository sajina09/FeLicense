import React from "react";
import { Button } from "antd";
import { Row, Col } from "antd";
import "./ErrorPage.css"; // Import the CSS file

const ErrorPage = ({
  code,
  codeMessage,
  button = "Go to Home",
  children,
}: any) => {
  return (
    <Row className="error" justify="center" align="middle">
      <Col span={12}>
        <h1 className="code">
          {code} <span className="code_message">{codeMessage || "Oops"}</span>
        </h1>
        <div className="message">
          <div>{children}</div>
          {button && (
            <Button
              className="button"
              type="primary"
              href={button.link}
              target="_blank"
              rel="noreferrer"
            >
              {button.text}
            </Button>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ErrorPage;
