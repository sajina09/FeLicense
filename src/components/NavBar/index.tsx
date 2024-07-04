import { FC, useState } from "react";
import "./styles.css";
import logo from "assets/logo.png";
import { Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks/useApp";
import { useDispatch } from "react-redux";
import { setCurrentModelSet, setCurrentSubject } from "redux/subjectSlice";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSubject, currentModelSet } = useAppSelector(
    (state) => state.subjects
  );

  const handleLogoClick = () => {
    dispatch(setCurrentModelSet(""));
    dispatch(setCurrentSubject(""));
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="logo-image" />
      </div>

      <div className="actions">
        <div>
          {/* <BeButton> Book Test</BeButton> */}
          {currentSubject && (
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/${currentSubject}`)}
                    >
                      {currentSubject}
                    </span>
                  ),
                },
              ]}
            />
          )}
        </div>
        {/* <div>
          <div>
            <Input
              placeholder="Search your field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </div>
        </div> */}
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
