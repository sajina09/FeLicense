import BeButton from "components/Button";
import { FC } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        Logo
      </div>
      <div className="actions">
        <BeButton> Book Test</BeButton>
      </div>
    </div>
  );
};

export default Navbar;
