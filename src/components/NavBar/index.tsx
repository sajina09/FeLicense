import { FC } from "react";
import "./styles.css";
import logo from "assets/logo.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      <div className="actions">{/* <BeButton> Book Test</BeButton> */}</div>
      <div style={{ marginRight: "1rem" }}>
        <Button
          onClick={() => {
            navigate("/all-fields");
          }}
        >
          Find your field
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
