import { useEffect, useState } from "react";

import { Button, CircularProgress } from "@mui/material";

import StyledModal from "@/shared/components/Modal";
import InputCustom from "@/shared/components/InputCustom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { reverseFinance } from "@/services/financeService";

import HorizontalLinearStepper, {
  handleBack,
  handleNext,
} from "@/shared/components/Stepper";

import { getReverseStepSchema } from "@/validations/finance/reverseSchema";

import { ButtonContainer, Form, Title } from "./styles";
import { formatToBRL } from "@/shared/utils/formatters/currency";
import { getOperationStatus } from "@/shared/utils/status/getOperationStatus";

const steps = ["Confirmar os Dados", "Enviar"];

interface IReverseForm {
  open: boolean;
  handleClose: () => void;
  transaction: any;
  fetchData: () => void;
}

const ReverseForm: React.FC<IReverseForm> = ({
  open,
  handleClose,
  transaction,
  fetchData,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getReverseStepSchema(activeStep)),
  });

  const onSubmit = async (data: any) => {
    if (isLastStep) {
      setIsLoading(true);
      const response = await reverseFinance({
        ...data,
        transactionId: transaction.id,
      });
      setIsLoading(false);

      if (response.success) {
        handleClose();
        fetchData();
      }
    } else {
      handleNext(activeStep, setActiveStep, steps);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
      setActiveStep(0);
    }
  }, [open, reset]);

  return (
    <StyledModal open={open} onClose={handleClose}>
      <HorizontalLinearStepper steps={steps} activeStep={activeStep}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <div>
              <Title>Reverter Transação</Title>
              <p>Tipo da Operação:{getOperationStatus(transaction.type)}</p>
              {transaction.receiverName && (
                <p>Destinatário: {transaction.receiverName}</p>
              )}
              <p>Valor: {formatToBRL(transaction.amount)}</p>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <Title>Digite sua senha de login</Title>

              <InputCustom
                name="password"
                type="password"
                control={control}
                label="Senha*"
                errors={errors}
                autoComplete="autoComplete"
              />
            </div>
          )}

          <ButtonContainer>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={() => handleBack(setActiveStep)}
              >
                Anterior
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              endIcon={
                isLoading && <CircularProgress color="inherit" size={18} />
              }
            >
              {isLastStep ? "Enviar" : "Próximo"}
            </Button>
          </ButtonContainer>
        </Form>
      </HorizontalLinearStepper>
    </StyledModal>
  );
};

export default ReverseForm;
