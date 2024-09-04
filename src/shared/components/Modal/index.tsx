import React, { ReactNode } from "react";

import { Modal } from "@mui/material";

import { ModalBox } from "./styles";

interface StyledModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const StyledModal: React.FC<StyledModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalBox>{children}</ModalBox>
    </Modal>
  );
};

export default StyledModal;
