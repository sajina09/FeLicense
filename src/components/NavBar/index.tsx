import { FC } from "react";
import "./styles.css";
import logo from "assets/logo.png";
import { Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks/useApp";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { currentSubject } = useAppSelector((state) => state.subjects);

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      <div className="actions">
        {/* <BeButton> Book Test</BeButton> */}
        {currentSubject && (
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: (
                  <span onClick={() => navigate(`/${currentSubject}`)}>
                    {currentSubject}
                  </span>
                ),
              },
            ]}
          />
        )}
      </div>
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
