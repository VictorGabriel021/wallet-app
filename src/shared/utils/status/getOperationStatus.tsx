import { Typography } from "@mui/material";
import { IOperationEnum } from "@/shared/enums/transfer";

export function getOperationStatus(operationType: IOperationEnum) {
  switch (operationType) {
    case IOperationEnum.TRANSFER:
      return (
        <Typography color="primary" fontWeight="bold">
          Transferência
        </Typography>
      );
    case IOperationEnum.DEPOSIT:
      return (
        <Typography color="success.main" fontWeight="bold">
          Depósito
        </Typography>
      );
    default:
      return (
        <Typography color="textSecondary" fontWeight="bold">
          Operação desconhecida
        </Typography>
      );
  }
}
