import { useEffect, useState } from "react";
import logo from "assets/logo.png";

const usePageLoader = (time = 1): [boolean, JSX.Element] => {
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, time);

    return () => clearTimeout(timeout);
  }, [time]);

  return [
    loader,
    <div className={`fullscreen-loader `}>
      <img
        src={logo}
        alt="Logo"
        className={`logo-fullscreen ${loader ? "logo-fade-in" : ""}`}
      />{" "}
    </div>,
  ];
};

export default usePageLoader;
