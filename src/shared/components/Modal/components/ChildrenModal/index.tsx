import { useState } from "react";

import StyledModal from "../..";

import { Button, CircularProgress } from "@mui/material";

interface IChildrenModal {
  title: string;
  description?: string;
  openButtonText?: string;
  submitButtonText?: string;
  isLoading: boolean;
}

const ChildrenModal: React.FC<IChildrenModal> = ({
  title,
  description,
  openButtonText,
  submitButtonText,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>

      <StyledModal open={open} onClose={handleClose}>
        <h2>O quanto quer guardar?</h2>
        <p>Seu saldo disponível é: R$ 96,84</p>

        <div>
          <Button onClick={handleClose}>Voltar</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            endIcon={
              isLoading && <CircularProgress color="inherit" size={18} />
            }
          >
            Enviar
          </Button>
        </div>
      </StyledModal>
    </>
  );
};

export default ChildrenModal;
