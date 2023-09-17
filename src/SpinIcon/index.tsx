import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SpinIcon: React.FC = ({ ...props }) => (
  <Spin indicator={antIcon} {...props} />
);

export default SpinIcon;
