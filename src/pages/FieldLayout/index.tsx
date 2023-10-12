import React, { useState } from "react";
import {
  BulbOutlined,
  FolderOpenOutlined,
  PushpinOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import ModelList from "ModelList";
import Syllabus from "components/Syllabus";

const { Content, Sider } = Layout;

const FieldLayout: React.FC = () => {
  const sidebarOptions = [
    {
      key: "1",
      icon: <FolderOpenOutlined />,
      label: `Syllabus`,
    },
    {
      key: "2",
      icon: <QuestionCircleOutlined />,
      label: `Model Questions`,
    },
    {
      key: "3",
      icon: <PushpinOutlined />,
      label: `MCQ's`,
    },
    {
      key: "4",
      icon: <BulbOutlined />,
      label: `Tips`,
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedOption, setSelectedOption] = useState(sidebarOptions[1].key);
  const comingSoon = () => {
    return (
      <div style={{ margin: "auto", marginTop: "150px", marginLeft: "500px" }}>
        Coming Soon...
      </div>
    );
  };
  let contentToRender: React.ReactNode = null;
  switch (selectedOption) {
    case "1":
      contentToRender = (
        <div>
          Download Syllabus
          <Syllabus />
          {comingSoon()}
        </div>
      );
      break;
    case "2":
      contentToRender = <ModelList />;
      break;
    case "3":
      contentToRender = <div>Content for MCQ's {comingSoon()}</div>;
      break;
    case "4":
      contentToRender = <div>Content for Tips {comingSoon()}</div>;
      break;
    default:
      break;
  }

  const handleMenuClick = (key: string) => {
    setSelectedOption(key); // Update the selectedOption when a menu item is clicked
  };

  return (
    <Layout style={{ marginTop: "2rem" }}>
      <Sider
        trigger={null}
        collapsible
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          height: "10vh",
          marginTop: "1.5rem",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["2"]}
          onSelect={({ key }) => handleMenuClick(key)}
          items={sidebarOptions}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {contentToRender}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FieldLayout;
