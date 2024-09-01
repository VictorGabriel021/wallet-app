import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

enum ToastPositions {
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
  TOP_CENTER = "top-center",
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
}
interface ToastProps {
  label: string;
  position?: ToastPositions;
}

const chooseConfig = (data: ToastProps) => {
  return {
    position: data.position,
    autoClose: 5000,
  };
};

export const FailAlert = (data: ToastProps) => {
  return toast.error(data.label, chooseConfig(data));
};

export const SuccessAlert = (data: ToastProps) => {
  return toast.success(data.label, chooseConfig(data));
};

export const WarningAlert = (data: ToastProps) => {
  return toast.warning(data.label, chooseConfig(data));
};

export const DefaultAlert = (data: ToastProps) => {
  return toast(data.label, chooseConfig(data));
};
