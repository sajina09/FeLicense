import { useEffect, useState } from "react";

const useModal = (props?: { visible: boolean }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const toggleVisibility = () => setVisible(!visible);

  useEffect(() => {
    if (typeof props?.visible === "boolean") {
      setVisible(props.visible);
    }
  }, [props?.visible]);

  return {
    visible,
    showModal,
    hideModal,
    toggleVisibility,
  };
};

export default useModal;
