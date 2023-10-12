import React from "react";
import logo from "assets/logo.png";
import "./styles.css";
import {
  FacebookOutlined,
  // InstagramOutlined,
  // MessageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer-column">
          <h2>Contact Us</h2>
          <p className="footer-small">Email: becomeaner@gmail.com</p>
          {/* <p className="footer-small">Phone: 123-456-7890</p> */}
        </div>
        <div className="footer-column">
          <h2>Useful Links</h2>
          <p className="footer-small">Practice</p>
          <p className="footer-small">Mock Test</p>
          <p className="footer-small">About Us</p>
          {/* <p className="footer-small">Programs</p> */}
        </div>
        <div className="footer-column">
          <h2>
            <img src={logo} alt="Logo" className="logo-image" />
          </h2>
          <div className="footer-logo"></div>
          <p className="footer-small">Join the conversation</p>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=61550895645997"
              target={"_blank"}
              rel="noreferrer"
            >
              <FacebookOutlined
                style={{ fontSize: "24px", color: "#1877f2" }}
              />
            </a>
            {/* <a
              href="https://www.instagram.com"
              target={"_blank"}
              rel="noreferrer"
            >
              <InstagramOutlined
                style={{ fontSize: "24px", color: "#e1306c" }}
              />
            </a>
            <a href="https://www.viber.com" target={"_blank"} rel="noreferrer">
              <MessageOutlined style={{ fontSize: "24px", color: "#7d71c4" }} />
            </a> */}
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        Copyright@2023 | Be.Er | Er.Production |{" "}
        <Button
          className="about-us"
          type="link"
          onClick={() => {
            navigate("/about-us");
          }}
        >
          About Us
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
