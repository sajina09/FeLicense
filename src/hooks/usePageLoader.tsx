import React, { useEffect, useState } from "react";
import logo from "assets/logo.png";
import "./CircleTextLoader.css"; // Import your CSS for the circular text animation

const usePageLoader = (time = 1200): [boolean, JSX.Element] => {
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, time);

    return () => clearTimeout(timeout);
  }, [time]);

  return [
    loader,
    <div className={`fullscreen-loader ${loader ? "loader-fade-out" : ""}`}>
      <div className="circle-text-container">
        <div className="circular-text">
          <p>Become an Engineer - Be Er.</p>
        </div>
        <div className={"image-conatiner"}>
          <img
            src={logo}
            alt="Logo"
            className={`logo-fullscreen ${loader ? "logo-fade-in" : ""}`}
          />
        </div>
      </div>
    </div>,
  ];
};

export default usePageLoader;
